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
import closeIcon from '../../assets/icons/close-sharp.svg';
import eraseIcon from '../../assets/icons/erase.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

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

    handleClearIngredients = () => {
        this.setState({
            ingredientsHTML: '<li></li>'
        })
    }

    handleClearInstructions = () => {
        this.setState({
            instructionsHTML: '<li></li>'
        })
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
            scanIngredientsModal: this.state.scanIngredientsModal ? false : true
        });
    }

    toggleScanInstructionsModal = () => {
        this.setState({
            scanInstructionsModal: this.state.scanInstructionsModal ? false : true
        });
    }

    formatIngredients = (string) => {
        const ingredientsArr = string.split('\n');
        const ingredientsHTML = ingredientsArr.map(ingredient => `<li>${ingredient}</li>`).join('');
        return ingredientsHTML;
    }

    formatInstructions = (string) => {
        console.log(string.replace(/\d\./, ''));
        const instructionsArr = string.replace(/\d\./g, '').split('.\n');
        const instructionsHTML = instructionsArr.map(instructions => `<li>${instructions}</li>`).join('');
        return instructionsHTML;
    }

    readTextInImage = (formData, addToState, formatFn) => {
        axiosInstance.post(`/upload`, formData)
            .then(response => {
                addToState(formatFn(response.data));
            })
            .catch(error => console.log(error));
    }

    addIngredientsToState = (ingredientsHTML) => {
        let newState = this.state.ingredientsHTML + ingredientsHTML;
        const parsedState = newState.replace(/\<li\>\<\/li\>/g,'');
        this.setState({
            ingredientsHTML: parsedState
        });
        this.toggleScanIngredientsModal();
    }

    addInstructionsToState = (instructionsHTML) => {
        let newState = this.state.instructionsHTML + instructionsHTML;
        const parsedState = newState.replace(/\<li\>\<\/li\>/g,'');
        this.setState({
            instructionsHTML: parsedState
        });
        this.toggleScanInstructionsModal();
    }

    buildRequestObject = (e) => {
        const data = new FormData(e.target);
        data.append('file', this.state.file);
        data.append('image', this.state.image);
        data.append('userId', this.state.userId);
        data.append('ingredients', this.state.ingredientsHTML);
        data.append('instructions', this.state.instructionsHTML);
        return data;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleAdd = (data) => {
        axiosInstance.post(`/recipes`, data)
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

    setImageSource = () => {
        if (this.state.image.match(/blob/)) {
            return this.state.image;
        } else {
            return `${API_URL}/${this.state.image}`;
        }
    }

    deleteImage = () => {
        this.setState({
            image: '',
            file: ''
        });
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
                {/* Display ChooseButton to add a picture or display current recipe picture with option ot remove */}
                <div className='recipe-form__top'>
                    <img className='recipe-form__delete-icon' src={closeIcon} alt='close' onClick={this.deleteImage} />
                    {this.state.image ?
                        <img className='recipe-form__pic' src={this.setImageSource()} alt='' /> :
                        <ChooseButton icon={cameraIcon} handleFileUpload={this.handleFileUpload} />} 
                </div>
                {/* bottom on form that overlaps the image div */}
                <div className='recipe-form__bottom'>
                    <BodyHeader goBack={this.goBack} h1Text={this.props.h1Text} icon={saveIcon} />
                    <div className='recipe-form__details-div'>
                        {/* contains stucture for the split view for desktop */}
                        <div className='recipe-form__side-by-side'>
                            {/* left side is same as ".recipe-form__top" but only visible on larger screen with the top div is hidden */}
                            <div className='recipe-form__side-pic-container'>
                                <img className='recipe-form__delete-icon' src={closeIcon} alt='close' onClick={this.deleteImage} />
                                {this.state.image ?
                                    <img className='recipe-form__pic' src={this.setImageSource()} alt='' /> :
                                    <ChooseButton icon={cameraIcon} handleFileUpload={this.handleFileUpload} />} 
                            </div>
                            {/* will appear to the right of the picture on desktop view */}
                            <div className='recipe-form__side-recipe-details'>
                                <label className='recipe-form__label' htmlFor='title'>Title</label>
                                <input
                                    className='recipe-form__text-input'
                                    id='title'
                                    name='title' 
                                    type='text' 
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div className='recipe-form__book-page-group'>
                                    <div className='recipe-form__input-group'>
                                        <label className='recipe-form__label' htmlFor='book'>Cookbook</label>
                                        <input
                                            className='recipe-form__text-input'
                                            id='book'
                                            name='book' 
                                            type='text' 
                                            value={this.state.book}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='recipe-form__input-group'>
                                        <label className='recipe-form__label' htmlFor='page'>Page</label>
                                        <input
                                            className='recipe-form__text-input'
                                            id='page'
                                            name='page' 
                                            type='text' 
                                            value={this.state.page}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <label className='recipe-form__label' htmlFor='category'>Category</label>
                                <select
                                    className='recipe-form__dropdown'
                                    id='category'
                                    name='category' 
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value=''>--</option>
                                    <option value='Appetizer'>APPETIZER</option>
                                    <option value='Beverage'>BEVERAGE</option>
                                    <option value='Breakfast'>BREAKFAST</option>
                                    <option value='Dessert'>DESSERT</option>
                                    <option value='Dinner'>DINNER</option>
                                    <option value='Lunch'>LUNCH</option>
                                    <option value='Main'>MAIN</option>
                                    <option value='Side Dish'>SIDE DISH</option>
                                    <option value='Soup'>SOUP</option>
                                </select>
                            </div>
                        </div>
                        <div className='recipe-form__label-div'>
                            <label 
                                className='recipe-form__label' 
                                htmlFor='ingredients'>
                                    Ingredients
                            </label> 
                            <div className='recipe-form__label-icon' onClick={this.handleClearIngredients}>
                                <img className='recipe-form__label-icon-pic' src={eraseIcon} alt='Clear All Ingredients Text' />
                            </div>
                            <div  className='recipe-form__label-icon' onClick={this.toggleScanIngredientsModal}>
                                <img className='recipe-form__label-icon-pic' src={addIcon} alt='Add Ingredients' />
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
                            <div className='recipe-form__label-icon' onClick={this.handleClearInstructions}>
                                <img className='recipe-form__label-icon-pic' src={eraseIcon} alt='Clear All Instructions Text' />
                            </div>
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