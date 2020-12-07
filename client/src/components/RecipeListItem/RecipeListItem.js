import React from 'react';
import './RecipeListItem.scss';

const RecipeListItem = ({ recipe }) => {
    // other avaiable value to deconstruct: id, image, category, ingredients, instructions
    const { title, book, page } = recipe;
    
    return (
        <div className='recipe-list-item'>
            <div className='recipe-list-item__pic-div'>
                <img className='recipe-list-item__pic' src='https://via.placeholder.com/100' alt='' />
            </div>
            <div className='recipe-list-item__details-div'>
                <h2 className='recipe-list-item__title'>{title}</h2>
                <p className='recipe-list-item__book'>Book:{book}</p>
                <p className='recipe-list-item__page'>Page:{page}</p>
            </div>
        </div>
    );
};

export default RecipeListItem;