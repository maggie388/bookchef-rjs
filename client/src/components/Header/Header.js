import React from 'react';
import './Header.scss';

// COMPONENTS
import SearchBar from '../SearchBar/SearchBar';

// ASSETS
import bookchefLogo from '../../assets/logos/bookchef-logo.svg';

const Header = () => {
    return (
        <header className='header'>
            <img className='header__logo' src={bookchefLogo} alt='bookchef logo' />
            <SearchBar />
        </header>
    );
};

export default Header;