import React from 'react';
import './CloseButton.scss';

// ASSETS
import closeIcon from '../../assets/icons/close-sharp.svg';

const CloseButton = ({ alt, clickAction }) => {
    return (
        <button className='close-button' onClick={clickAction}>
            <img className='close-button__pic' src={closeIcon} alt={alt} />
        </button>
    );
};

export default CloseButton;