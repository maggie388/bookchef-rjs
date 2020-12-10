import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import axiosInstance from '../../utils/axios';
import './RecipeForm.scss';

// COMPONENTS
import ScanModal from '../../components/ScanModal/ScanModal';
import BodyHeader from '../../components/BodyHeader/BodyHeader';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

// ASSETS
import saveIcon from '../../assets/icons/save-sharp.svg';
import addIcon from '../../assets/icons/add-sharp.svg';
import cameraIcon from '../../assets/icons/camera-sharp.svg'


class RecipeForm extends Component {
    constructor() {
        super();
        this.editableIngredients = React.createRef();
        this.editableInstructions = React.createRef();
        this.state = {
            // form values
            title: '',
            book: '',
            page: '',
            category: '',
            ingredientsHTML: '<li></li>',
            instructionsHTML: '<li></li>',
            image: '',
            file: '',
            // modal rendering
            scanIngredientsModal: false,
            scanInstructionsModal: false
        };
    }

    handleFileUpload = (e) => {
        this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleIngredientsChange = (e) => {
        this.setState({
            ingredientsHTML: e.target.value
        });
    }

    handleInstructionsChange = (e) => {
        this.setState({
            instructionsHTML: e.target.value
        });
    }

    toggleScanIngredientsModal = () => {
        this.setState({
            scanIngredientsModal: !this.state.scanIngredientsModal
        });
    }

    toggleScanInstructionsModal = () => {
        this.setState({
            scanInstructionsModal: !this.state.scanInstructionsModal
        });
    }

    formatIngredients = (string) => {
        const ingredientsArr = string.split('\n');
        const ingredientsHTML = ingredientsArr.map(ingredient => `<li>${ingredient}</li>`).join('');
        return ingredientsHTML;
    }

    formatInstructions = (string) => {
        const instructionsArr = string.split('.\n');
        const instructionsHTML = instructionsArr.map(instructions => `<li>${instructions}</li>`).join('');
        return instructionsHTML;
    }

    readTextInImage = (formData, addToState, formatFn) => {
        axiosInstance.post('/upload', formData)
            .then(response => {
                addToState(formatFn(response.data));
            })
            .catch(error => console.log(error));
    }

    addIngredientsToState = (ingredientsHTML) => {
        this.setState({
            ingredientsHTML: ingredientsHTML
        });
        this.toggleScanIngredientsModal();
    }

    addInstructionsToState = (instructionsHTML) => {
        this.setState({
            instructionsHTML: instructionsHTML
        });
        this.toggleScanInstructionsModal()
    }

    buildRequestObject = (e) => {
        const data = new FormData(e.target);
        data.append('image', this.state.file);
        data.append('userId', this.state.userId);
        data.append('ingredients', this.state.ingredientsHTML);
        data.append('instructions', this.state.instructionsHTML);
        return data;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleAdd = (data) => {
        axiosInstance.post('/recipes', data)
            .then((_response) => {
                this.goBack();
            })
            .catch((error) => console.log(error));
    }

    handleEdit = (data) => {
        axiosInstance.put(`/recipes/${this.props.recipe.id}`, data)
            .then((_response) => {
                this.goBack();
            })
            .catch((error) => console.log(error));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.buildRequestObject(e);
        if (this.props.recipe) {
            this.handleEdit(data);
            return;
        }
        this.handleAdd(data);
    }

    componentDidMount() {
        if (this.props.recipe) {
            const { user_id, title, book, page, category, ingredients, instructions, image } = this.props.recipe;
            this.setState({
                userId: user_id,
                title: title,
                book: book,
                page: page,
                category: category,
                ingredientsHTML: ingredients,
                instructionsHTML: instructions,
                image: image
            });
        }
    }

    render() {
        if (this.state.scanIngredientsModal) {
            return (
                <ScanModal 
                    readText={this.readTextInImage}
                    addToState={this.addIngredientsToState}
                    formatFn={this.formatIngredients}
                    close={this.toggleScanIngredientsModal}
                />
            );
        }

        if (this.state.scanInstructionsModal) {
            return (
                <ScanModal
                    readText={this.readTextInImage}
                    addToState={this.addInstructionsToState}
                    formatFn={this.formatInstructions}
                    close={this.toggleScanInstructionsModal}
                />
            );
        }

        return (
            <form className='recipe-form' onSubmit={this.handleSubmit}>
                <div className='recipe-form__top'>
                    {this.state.image ?
                        <img className='recipe-form__pic' src={this.state.image} alt='' /> :
                        <ChooseButton icon={cameraIcon} handleFileUpload={this.handleFileUpload} />} 
                </div>
                <div className='recipe-form__bottom'>
                    <BodyHeader goBack={this.goBack} h1Text={this.props.h1Text} icon={saveIcon} />
                    <div className='recipe-form__details-div'>
                        <label className='recipe-form__label' htmlFor='title'>Title</label>
                        <input
                            className='recipe-form__text-input'
                            id='title'
                            name='title' 
                            type='text' 
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        <label className='recipe-form__label' htmlFor='book'>Cookbook</label>
                        <input
                            className='recipe-form__text-input'
                            id='book'
                            name='book' 
                            type='text' 
                            value={this.state.book}
                            onChange={this.handleChange}
                        />
                        <label className='recipe-form__label' htmlFor='page'>Page</label>
                        <input
                            className='recipe-form__text-input'
                            id='page'
                            name='page' 
                            type='text' 
                            value={this.state.page}
                            onChange={this.handleChange}
                        />
                        <label className='recipe-form__label' htmlFor='page'>Category</label>
                        <input
                            className='recipe-form__text-input'
                            id='category'
                            name='category' 
                            type='text' 
                            value={this.state.category}
                            onChange={this.handleChange}
                        />
                        <div className='recipe-form__label-div'>
                            <label 
                                className='recipe-form__label' 
                                htmlFor='ingredients'>
                                    Ingredients
                            </label> 
                            <div className='recipe-form__label-icon' onClick={this.toggleScanIngredientsModal}>
                                <img src={addIcon} alt='Add Ingredients' />
                            </div>
                        </div>
                        <ContentEditable 
                            className='recipe-form__dynamic recipe-form__dynamic--ingredients'
                            innerRef={this.editableIngredients}
                            html={this.state.ingredientsHTML}
                            disabled={false}
                            onChange={this.handleIngredientsChange}
                            tagName='ul'
                        />
                        <div className='recipe-form__label-div'>
                            <label 
                                className='recipe-form__label' 
                                htmlFor='instructions'>
                                    Instructions
                            </label> 
                            <div className='recipe-form__label-icon' onClick={this.toggleScanInstructionsModal}>
                                <img className='recipe-form__label-icon-pic' src={addIcon} alt='Add Instructions' />
                            </div>
                        </div>
                        <ContentEditable 
                            className='recipe-form__dynamic recipe-form__dynamic--instructions'
                            innerRef={this.editableInstructions}
                            html={this.state.instructionsHTML}
                            disabled={false}
                            onChange={this.handleInstructionsChange}
                            tagName='ul'
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default RecipeForm;