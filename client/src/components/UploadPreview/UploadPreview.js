import React from 'react';
import './UploadPreview.scss';

// COMPONENTS
import UploadMenu from '../UploadMenu/UploadMenu';

const UploadPreview = ({ imageURL }) => {
    return (
        <div className="upload-preview">
            {imageURL ? <img className="upload-preview__img" src={imageURL} alt="Preview" /> : null}
            <UploadMenu />
        </div>
    );
};

export default UploadPreview;