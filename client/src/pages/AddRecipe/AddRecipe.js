import React from 'react';
import './AddRecipe.scss';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import Header from '../../components/Header/Header';

const AddRecipe = ({ history }) => {
    return (
        <RecipeForm 
            h1Text='Add New Recipe' 
            history={history} />
    );
}

export default AddRecipe;