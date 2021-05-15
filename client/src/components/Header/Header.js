import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

// IMPORTED COMPONENTS
import ExpandedMenu from '../ExpandedMenu/ExpandedMenu';

// ASSETS
import bookchefLogo from '../../assets/logos/bookchef-logo.svg';
import menuIcon from '../../assets/icons/menu-outline.svg';

class Header extends Component {
    state = {
        expandMenu: false
    }

    toggleMenu = () => {
        this.setState({
            expandMenu: !this.state.expandMenu
        });
    }

    componentWillMount() {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            this.props.toggleIsLoggedIn(true);
        } else {
            this.props.toggleIsLoggedIn(false);
        }
    }

    render() {
        return (
            <>
            <header className='header'>
                <Link to='/'>
                    <img className='header__logo' src={bookchefLogo} alt='Bookchef logo' />
                </Link>
                {this.props.isLoggedIn && <img className='header__menu' src={menuIcon} alt='Expand Menu' onClick={this.toggleMenu} />}
            </header>
            {this.state.expandMenu && <ExpandedMenu isLoggedIn={this.props.isLoggedIn} toggleMenu={this.toggleMenu} />}
            </>
        );
    }

};

export default Header;