import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeListItem.scss';

// COMPONENTS
import IconButton from '../../components/IconButton/IconButton';

// ASSETS
import editIcon from '../../assets/icons/pencil-sharp.svg';

// VARIABLES
import { API_URL } from '../../App';

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
                    <Link className='recipe-list-item__button' to={`/recipe/edit/${recipe.id}`}>
                        <img className='recipe-list-item__icon'src={editIcon} alt='Edit' />
                    </Link>
                    <IconButton
                        type='trash'
                        size='small'
                        alt='delete'
                        clickAction={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeListItem;