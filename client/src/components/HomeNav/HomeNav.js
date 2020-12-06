import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNav.scss';

// ASSETS
import userIcon from '../../assets/icons/person-sharp.svg';
import addIcon from '../../assets/icons/add-sharp.svg';
import filterIcon from '../../assets/icons/filter-sharp.svg';

// COMPONENTS
import NavButton from '../NavButton/NavButton'

const HomeNav = () => {
    return (
        <nav className="home-nav">
            <Link to="/"><NavButton src={userIcon} alt={"Profile"} /></Link>
            <Link to="/upload"><NavButton src={addIcon} alt={"Add Recipe"} /></Link>
            <Link to="/"><NavButton src={filterIcon} alt={"Filter"} /></Link>
        </nav>
    );
};

export default HomeNav;