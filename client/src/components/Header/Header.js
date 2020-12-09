import React from 'react';
import './Header.scss';

// COMPONENTS
import SearchBar from '../SearchBar/SearchBar';
import AddRecipeButton from '../AddRecipeButton/AddRecipeButton';

// ASSETS
import bookchefLogo from '../../assets/logos/bookchef-logo.svg';
import menuIcon from '../../assets/icons/menu-outline.svg';


const Header = () => {
    return (
        <header className='header'>
            <div className='header__top-row'>
                <img className='header__logo' src={bookchefLogo} alt='Bookchef logo' />
                <img className='header__menu' src={menuIcon} alt='Expand Menu' />
            </div>
            <div className='header__bottom-row'>
                <SearchBar />
                <AddRecipeButton />
            </div>
        </header>
    );
};

export default Header;