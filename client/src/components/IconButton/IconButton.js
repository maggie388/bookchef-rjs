import React from 'react';
import './IconButton.scss';

// ASSETS
import addOutline from '../../assets/icons/add-sharp.svg';
import addFill from '../../assets/icons/add-circle-green.svg';
import close from '../../assets/icons/close-sharp.svg';
import edit from '../../assets/icons/pencil-sharp.svg';
import save from '../../assets/icons/save-sharp.svg';

const IconButton = ({ type, size, alt, clickAction }) => {

    let icon;
    switch(type) {
        case 'add outline':
            icon = addOutline;
            break;
        case 'add fill':
            icon = addFill;
            break;
        case 'close':
            icon = close;
            break;
        case 'edit':
            icon = edit;
            break;
        case 'save':
            icon = save;
    }

    return (
        <button className={`icon-button--${size}`} onClick={clickAction}>
            <img src={icon} alt={alt} />
        </button>
    );
};

export default IconButton;