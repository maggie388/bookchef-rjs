import React from 'react';
import './CloseButton.scss';

// ASSETS
import closeIcon from '../../assets/icons/close-sharp.svg';

const CloseIcon = ({ alt, clickAction }) => {
    return (
        <button className='close-icon' onClick={clickAction}>
            <img className='close-icon__pic' src={closeIcon} alt={alt} />
        </button>
    );
};

export default CloseIcon;