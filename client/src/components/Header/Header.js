import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to='/'>
                    <img className='header__logo' src={bookchefLogo} alt='Bookchef logo' />
                </Link>
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