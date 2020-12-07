import React, { Component } from 'react';
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
    state = {
        // form values
        title: '',
        cookbook: '',
        page: '',
        category: '',
        ingredients: '',
        instructions: '',
        // modal rendering
        scanIngredientsModal: false,
        scanInstructionsModal: false
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
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
        return ingredientsArr;
    }

    formatInstructions = () => {
        const instructionsArr = string.split('.\n');
        return instructionsArr;
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
        console.log("Add Ingredients to State");
        this.setState({
            ingredients: text
        });
        this.toggleScanIngredientsModal();
    }

    addInstructionsToState = (text) => {
        console.log("Add Instructions to State");
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
                    <textarea 
                        className='recipe-form__textarea'
                        id='ingredients' 
                        name='ingredients' 
                        value={this.state.ingredients}
                        onChange={this.handleChange}
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
                    <textarea 
                        className='recipe-form__textarea'
                        id='instructions' 
                        name='instructions' 
                        value={this.state.instructions}
                        onChange={this.handleChange}
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