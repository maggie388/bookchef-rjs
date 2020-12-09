import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNav.scss';

// ASSETS
import userIcon from '../../assets/icons/person-sharp.svg';
import addIcon from '../../assets/icons/add-sharp.svg';
import filterIcon from '../../assets/icons/filter-sharp.svg';

const HomeNav = () => {
    return (
        <nav className='home-nav'>
            <Link className='home-nav__link' to='/filter'>
                <img className='home-nav__icon' src={filterIcon} alt='Filter' />
            </Link>
            <Link className='home-nav__link' to='/recipe/add'>
                <img className='home-nav__icon home-nav__icon--bigger' src={addIcon} alt='Add Recipe' />
            </Link>
            <Link className='home-nav__link' to='/profile'>
                <img className='home-nav__icon' src={userIcon} alt='Profile' />
            </Link>
        </nav>
    );
};

export default HomeNav;