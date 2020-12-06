import React from 'react';
import './UploadForm.scss';

// COMPONENTS
import ChooseButton from '../../components/ChooseButton/ChooseButton';
import UploadNav from '../../components/UploadNav/UploadNav';

const UploadForm = ({ imageURL, handleFileUpload, handleFormSubmit }) => {
    return (
        <form className='upload-form' onSubmit={handleFormSubmit}>
            <ChooseButton 
                    handleFileUpload={handleFileUpload}
                    imageURL={imageURL} />
            <UploadNav />
        </form>
    );
};

export default UploadForm;