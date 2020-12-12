import React from 'react';
import './AddButton.scss';

// ASSETS
import addIcon from '../../assets/icons/add-sharp.svg';

const AddButton = ({ alt, clickAction }) => {
    return (
        <button className='add-button' onClick={clickAction}>
            <img className='add-button__pic' src={addIcon} alt={alt} />
        </button>
    );
};

export default AddButton;