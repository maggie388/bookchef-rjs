import React from 'react';
import { Link } from 'react-router-dom';
import './UploadMenu.scss';

// ASSETS
import cropIcon from '../../assets/icons/crop-sharp.svg';
import rotateIcon from '../../assets/icons/rotate.svg';
import forwardIcon from '../../assets/icons/arrow-forward-sharp.svg';

// COMPONENTS

const UploadNav = ({ handleSubmit }) => {
    return (
        <nav className='upload-menu'>
            <button className='upload-menu__button'>
                <img className='upload-menu__icon' src={rotateIcon} alt='Rotate' />
            </button>
            <button className='upload-menu__button'>
                <img className='upload-menu__icon' src={cropIcon} alt='Crop' />
            </button>
            <button className='upload-menu__button' type='submit'>
                <img className='upload-menu__icon' src={forwardIcon} alt='Continue' />
            </button>
        </nav>
    );
};

export default UploadNav;