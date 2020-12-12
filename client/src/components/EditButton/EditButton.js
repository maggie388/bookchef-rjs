import React from 'react';
import './EditButton.scss';

// ASSETS
import editIcon from '../../assets/icons/pencil-sharp.svg';

const EditButton = ({ alt, clickAction }) => {
    return (
        <button className='edit-icon' onClick={clickAction}>
            <img className='edit-icon__pic' src={editIcon} alt={alt} />
        </button>
    );
};

export default EditButton;