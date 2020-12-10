import React from 'react';
import './ChooseButton.scss';

// ASSETS
import scanIcon from '../../assets/icons/scan-outline.svg';

const ChooseButton = ({ icon, handleFileUpload }) => {
    return (
            <label className='choose-button'>
                <img className='choose-button__icon' src={icon} alt='Choose' />
                <input 
                    className='choose-button__input' 
                    name='image' 
                    type='file' 
                    onChange={handleFileUpload}
                    accept="image/*" />
            </label>
    );
}

export default ChooseButton;