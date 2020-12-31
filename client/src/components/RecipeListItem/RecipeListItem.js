import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeListItem.scss';

// ASSETS
import trashIcon from '../../assets/icons/trash-sharp.svg';
import editIcon from '../../assets/icons/pencil-sharp.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL

const RecipeListItem = ({ recipe, deleteRecipe }) => {

    const { id, title, book, page, category, image } = recipe;

    const handleDelete = () => {
        deleteRecipe(id);
    }

    const recipePic = image && <img className='recipe-list-item__pic' src={`${API_URL}/${image}`} alt={title} />;

    return (
        <div className='recipe-list-item'>
            <Link to={`/recipe/${recipe.id}`}>
                <div className='recipe-list-item__pic-div'>
                    {image && recipePic}
                </div>
            </Link>
            <div className='recipe-list-item__details-div'>
                <Link to={`/recipe/${recipe.id}`}>
                    <h2 className='recipe-list-item__title'>{title}</h2>
                    <p className='recipe-list-item__source'>{`${book}, page ${page}`}</p>
                </Link>
                <div className='recipe-list-item__icon-group'>
                    <h3 className='recipe-list-item__category'>{category}</h3>
                    <Link to={`/recipe/edit/${recipe.id}`}>
                        <img className='recipe-list-item__icon recipe-list-item__icon--nudge'src={editIcon} alt='Edit' />
                    </Link>
                    <img 
                        className='recipe-list-item__icon'
                        onClick={handleDelete}
                        src={trashIcon} 
                        alt='Delete' 
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeListItem;