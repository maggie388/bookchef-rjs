import React from 'react';
import './NavButton.scss';

const NavButton = ({ type, src, alt }) => {
    return (
        <button className="nav-button" type={type || ""}>
            <img className="nav-button__icon" src={src} alt={alt} />
        </button>
    );
};

export default NavButton;