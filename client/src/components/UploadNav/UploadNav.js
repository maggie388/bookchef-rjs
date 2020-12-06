import React from 'react';
import { Link } from 'react-router-dom';
import './UploadNav.scss';

// ASSETS
import cropIcon from '../../assets/icons/crop-sharp.svg';
import saveIcon from '../../assets/icons/save-sharp.svg';
import closeIcon from '../../assets/icons/close-sharp.svg';

// COMPONENTS
import NavButton from '../NavButton/NavButton'

const UploadNav = ({ handleSubmit }) => {
    return (
        <nav className='upload-nav'>
            <NavButton 
                src={cropIcon} 
                alt='Crop' />
            <NavButton 
                src={saveIcon} 
                alt='Save' 
                type='Submit' />
            <Link to='/'>
                <NavButton 
                    src={closeIcon} 
                    alt='Cancel' />
            </Link>
        </nav>
    );
};

export default UploadNav;