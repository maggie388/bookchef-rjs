import React from 'react';
import { useHistory } from 'react-router-dom';
import './ExpandedMenu.scss';

// ASSETS
import closeIcon from '../../assets/icons/close-sharp.svg';

const ExpendedMenu = ({ toggleMenu, isLoggedIn }) => {
    const history = useHistory();

    const loggedInMenuItems = () => {
        const items = ['Profile', 'Settings'];
        return items.map((item) => {
            return <li className='expanded-menu__list-item'>{item}</li>
        });
    }

    const signOut = () => {
        sessionStorage.removeItem('authToken');
        toggleMenu();
        history.push('/');
        window.location.reload();
    }

    return (
        <div className='expanded-menu'>
            <img className='expanded-menu__close' src={closeIcon} alt='close' onClick={toggleMenu} />
            <ul className='expanded-menu__list'>
                {loggedInMenuItems()}
                <li className='expanded-menu__list-item' onClick={signOut}>Sign out</li>
            </ul>
        </div>
    );
};

export default ExpendedMenu;