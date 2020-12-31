import React from 'react';
import { Link } from 'react-router-dom';
import './AddRecipeButton.scss';

// ASSETS
import addIcon from '../../assets/icons/add-circle-green.svg';

const AddRecipeButton = () => {
    return (
        <Link className='add-recipe-button' to='/recipe/add'>
                <img className='add-recipe-button__icon' src={addIcon} alt='Add Recipe' />
        </Link>
    );
};

export default AddRecipeButton;