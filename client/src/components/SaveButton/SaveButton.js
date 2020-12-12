import React from 'react';
import './SaveButton.scss';

// ASSETS
import saveIcon from '../../assets/icons/save-sharp.svg';

const SaveButton = ({ alt, clickAction }) => {
    return (
        <button className='save-button' onClick={clickAction}>
            <img className='save-button__pic' src={saveIcon} alt={alt} />
        </button>
    );
};

export default SaveButton;