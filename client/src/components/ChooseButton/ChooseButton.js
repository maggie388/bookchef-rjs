import React from 'react';
import './ChooseButton.scss';

// ASSETS
import UploadPreview from '../../components/UploadPreview/UploadPreview';

const ChooseButton = ({ handleFileUpload, imageURL }) => {
    return (
            <label className='choose-button'>
                <UploadPreview imageURL={imageURL} /> 
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