import React from 'react';
import './RecipeListContainer.scss';

// COMPONENTS
import RecipeListItem from '../RecipeListItem/RecipeListItem';

const RecipeListContainer = ({ recipes }) => {
    return (
        recipes.map((recipe) => {
            return <RecipeListItem key={recipe.id} recipe={recipe} />
        })
    );
};

export default RecipeListContainer;