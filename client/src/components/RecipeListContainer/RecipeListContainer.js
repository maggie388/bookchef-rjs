import React from 'react';
import './RecipeListContainer.scss';

// COMPONENTS
import RecipeListItem from '../RecipeListItem/RecipeListItem';

const RecipeListContainer = ({ recipes, deleteRecipe }) => {
    return (
        <div className='recipe-list-container'>
            {recipes.map((recipe) => {
                return <RecipeListItem key={recipe.id} recipe={recipe} deleteRecipe={deleteRecipe} />
            })}
        </div>
    );
};

export default RecipeListContainer;