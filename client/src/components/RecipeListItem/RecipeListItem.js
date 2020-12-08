import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeListItem.scss';

// ASSETS
import trashIcon from '../../assets/icons/trash-sharp.svg';
import editIcon from '../../assets/icons/pencil-sharp.svg';

const RecipeListItem = ({ recipe }) => {
    // other avaiable value to deconstruct: id, image, ingredients, instructions
    const { title, book, page, category } = recipe;

    

    return (
        <div>
            <div className='recipe-list-item'>
                <Link to={`/recipe/${recipe.id}`}>
                    <div className='recipe-list-item__pic-div'>
                        <img className='recipe-list-item__pic' src='https://via.placeholder.com/100' alt='' />
                    </div>
                </Link>
                <div className='recipe-list-item__details-div'>
                    <Link to={`/recipe/${recipe.id}`}>
                        <h2 className='recipe-list-item__title'>{title}</h2>
                        <p className='recipe-list-item__book'>Book: {book}</p>
                        <p className='recipe-list-item__page'>Page: {page}</p>
                    </Link>
                    <div className='recipe-list-item__icon-group'>
                        <h3 className='recipe-list-item__category'>{category}</h3>
                        <Link to={`/recipe/edit/${recipe.id}`}>
                            <img className='recipe-list-item__icon'src={editIcon} alt='Edit' />
                        </Link>
                        <img className='recipe-list-item__icon'src={trashIcon} alt='Delete' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeListItem;