import React from 'react';
import './ChooseButton.scss';

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