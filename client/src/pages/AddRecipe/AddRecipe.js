import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';
import './AddRecipe.scss';

// COMPONENTS
import NavButton from '../../components/NavButton/NavButton';
import ScanModal from '../../components/ScanModal/ScanModal';

// ASSETS
import saveIcon from '../../assets/icons/save-sharp.svg';
import addIcon from '../../assets/icons/add-sharp.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class AddRecipe extends Component {
    constructor() {
        super();
        this.editableIngredients = React.createRef();
        this.editableInstructions = React.createRef();
        this.state = {
            // form values
            title: '',
            cookbook: '',
            page: '',
            category: '',
            ingredientsHTML: '',
            instructionsHTML: '',
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
        this.setState({
            ingredientsHTML: ingredientsHTML
        });
    }

    formatInstructions = (string) => {
        const instructionsArr = string.split('.\n');
        const instructionsHTML = instructionsArr.map(instructions => `<li>${instructions}</li>`).join('');
        this.setState({
            instructionsHTML: instructionsHTML
        });
    }

    readTextInImage = (formData, addToState, formatFn) => {
        axios.post(API_URL + '/upload', formData)
            .then(response => {
                formatFn(response.data);
                addToState(response.data);
            })
            .catch(error => console.log(error));
    }

    addIngredientsToState = (text) => {
        this.setState({
            ingredients: text
        });
        this.toggleScanIngredientsModal();
    }

    addInstructionsToState = (text) => {
        this.setState({
            instructions: text
        });
        this.toggleScanInstructionsModal()
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log('Form has been Saved');
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
            <>
                <header className='recipe-header'>
                    <img src='' alt='' />
                </header>
                <form className='recipe-form' onSubmit={this.handleSave}>
                    <label className='recipe-form__label' htmlFor='title'>Title</label>
                    <input
                        className='recipe-form__text-input'
                        id='title'
                        name='title' 
                        type='text' 
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <label className='recipe-form__label' htmlFor='cookbook'>Cookbook</label>
                    <input
                        className='recipe-form__text-input'
                        id='cookbook'
                        name='cookbook' 
                        type='text' 
                        value={this.state.cookbook}
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
                        <span className='recipe-form__label-icon' onClick={this.toggleScanIngredientsModal}>
                            <img src={addIcon} alt='Add Ingredients' />
                        </span>
                    </div>
                    <ContentEditable 
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
                        <span className='recipe-form__label-icon' onClick={this.toggleScanInstructionsModal}>
                            <img className='recipe-form__label-icon-pic' src={addIcon} alt='Add Instructions' />
                        </span>
                    </div>
                    <ContentEditable 
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
                            type='Submit' 
                        />
                    </nav>

                </form>
            </>
        );
    }
}

export default AddRecipe;