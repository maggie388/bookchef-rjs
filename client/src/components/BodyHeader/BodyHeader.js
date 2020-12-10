import React from 'react';
import { Link } from 'react-router-dom';
import './BodyHeader.scss';

// ASSETS
import backIcon from '../../assets/icons/arrow-back-sharp.svg';

// 'recipeId' is an optional prop
const BodyHeader = ({ goBack, h1Text, icon, recipeId }) => {

    const renderSaveButton = () => {
        return (
            <button className='body-header__button' type='submit'>
                <img 
                    className='body-header__icon' 
                    src={icon} 
                    alt='Save' 
                />
            </button>
        )
    }

    const renderEditButton = () => {
        return (
            <Link to={`/recipe/edit/${recipeId}`}>
                <button className='body-header__button'>
                    <img 
                        className='body-header__icon' 
                        src={icon} 
                        alt='Edit' 
                    />
                </button>
            </Link>
        );
    }

    const rightSideIcon = recipeId ? renderEditButton() : renderSaveButton();

    return (
        <div className='body-header'>
            <img 
                className='body-header__go-back' 
                onClick={goBack}
                src={backIcon} 
                alt='Go Back' 
            />
            <h1 className='body-header__title'>{h1Text}</h1>
            {rightSideIcon}
        </div>
    );
};

export default BodyHeader;