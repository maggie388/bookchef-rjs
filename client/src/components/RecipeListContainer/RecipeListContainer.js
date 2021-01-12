import React from 'react';
import './RecipeListContainer.scss';

// COMPONENTS
import RecipeListItem from '../RecipeListItem/RecipeListItem';

const RecipeListContainer = ({ recipes, deleteRecipe }) => {
    if (recipes.length === 0) {
        return (
            <div className='recipe-list-container__empty'>
                <p className='recipe-list-container__empty-text'>You haven't added any recipes yet!</p>
            </div>
        )
    }
    return (
        <div className='recipe-list-container'>
            {recipes.map((recipe) => {
                return <RecipeListItem key={recipe.id} recipe={recipe} deleteRecipe={deleteRecipe} />
            })}
        </div>
    );
};

export default RecipeListContainer;