import React from 'react';
import './RecipeCard.scss';

const RecipeCard = () => {
    return (
        <div className='recipe-card'>
            <div className='recipe-card__pic-div'>
                <img className='recipe-card__pic' src='https://via.placeholder.com/100' alt='' />
            </div>
            <div className='recipe-card__details-div'>
                <h2 className='recipe-card__title'>Almond Flour Pancakes</h2>
                <p className='recipe-card__book'>Book: Love &amp; Lemons</p>
                <p className='recipe-card__page'>Page: 55</p>
            </div>
        </div>
    );
};

export default RecipeCard;