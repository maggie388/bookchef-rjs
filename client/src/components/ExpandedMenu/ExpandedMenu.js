import React from 'react';
import { useHistory } from 'react-router-dom';
import './ExpandedMenu.scss';

import closeIcon from '../../assets/icons/close-sharp.svg';

const ExpendedMenu = ({ toggleMenu }) => {
    const history = useHistory();

    const signOut = () => {
        sessionStorage.removeItem('authToken');
        toggleMenu();
        return history.push('/');
    }

    return (
        <div className='expanded-menu'>
            <img className='expanded-menu__close' src={closeIcon} alt='close' onClick={toggleMenu} />
            <ul className='expanded-menu__list'>
                <li className='expanded-menu__list-item'>Profile</li>
                <li className='expanded-menu__list-item'>Settings</li>
                <li className='expanded-menu__list-item' onClick={signOut}>Sign out</li>
            </ul>
        </div>
    );
};

export default ExpendedMenu;