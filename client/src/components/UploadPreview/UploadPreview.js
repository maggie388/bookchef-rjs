import React from 'react';
import './UploadPreview.scss';

const UploadPreview = ({ imageURL }) => {
    return (
        <div className="upload-preview">
            {imageURL ? <img className="upload-preview__img" src={imageURL} alt="Preview" /> : null}
        </div>
    );
};

export default UploadPreview;