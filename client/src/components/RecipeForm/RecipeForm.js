import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';
import './RecipeForm.scss';

// COMPONENTS
import NavButton from '../../components/NavButton/NavButton';
import ScanModal from '../../components/ScanModal/ScanModal';

// ASSETS
import saveIcon from '../../assets/icons/save-sharp.svg';
import addIcon from '../../assets/icons/add-sharp.svg';
import backIcon from '../../assets/icons/arrow-back-sharp.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class RecipeForm extends Component {
    constructor() {
        super();
        this.editableIngredients = React.createRef();
        this.editableInstructions = React.createRef();
        this.state = {
            // form values
            userId: '3',
            title: '',
            book: '',
            page: '',
            category: '',
            ingredientsHTML: '',
            instructionsHTML: '',
            image: '',
            // modal rendering
            scanIngredientsModal: false,
            scanInstructionsModal: false
        };
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
        axios.post(API_URL + '/upload', formData)
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

    buildRequestObject = () => {
        const data = {
            userId: this.state.userId,
            title: this.state.title,
            book: this.state.book,
            page: this.state.page,
            category: this.state.category,
            ingredients: this.state.ingredientsHTML,
            instructions: this.state.instructionsHTML,
            image: this.state.image
        }
        return data;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    handleSave = (e) => {
        e.preventDefault();
        const data = this.buildRequestObject();
        axios.post(API_URL + '/recipes', data)
            .then((_response) => {
                this.goBack();
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        if (this.props.recipe.id) {
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
                />
            );
        }

        if (this.state.scanInstructionsModal) {
            return (
                <ScanModal
                    readText={this.readTextInImage}
                    addToState={this.addInstructionsToState}
                    formatFn={this.formatInstructions}
                />
            );
        }

        return (
                <form className='recipe-form' onSubmit={this.handleSave}>
                    <div className='recipe-form__top'>
                        <img className='recipe-form__pic' src='' alt='' />
                    </div>
                    <div className='recipe-form__bottom'>
                        <div className='recipe-form__title-div'>
                            <Link to='/'>
                                <img className='recipe-form__go-back' src={backIcon} alt='Go Back' />
                            </Link>
                            <h1 className='recipe-form__title'>{this.props.h1Text}</h1>
                        </div>
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
                            <nav>
                                <NavButton 
                                    src={saveIcon} 
                                    alt='Save' 
                                    type='submit' 
                                />
                            </nav>
                        </div>
                    </div>
                </form>
        );
    }
}

export default RecipeForm;