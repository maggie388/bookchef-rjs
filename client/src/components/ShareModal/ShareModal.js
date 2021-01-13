import React from 'react';
import './ShareModal.scss';

// ASSETS
import closeIcon from '../../assets/icons/close-sharp.svg';

const ShareModal = ({ recipeId, toggleShare, shareRecipe }) => {

    const handleShare = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const notes = e.target.notes.checked;
        shareRecipe(recipeId, email, notes);

    }
    return (
        <div className='share-modal'>
            <form className='share-modal__form' onSubmit={handleShare}>
                <button className='share-modal__close'>
                    <img className='share-modal__close-icon' src={closeIcon} alt='close share modal' onClick={toggleShare} />
                </button>
                <label className='share-modal__label' htmlFor='email'>Your Friend's Email</label>
                <input className='share-modal__input' id='email' name='email' type='text' required />
                <label className='share-modal__label'>
                    <input className='share-modal__select' name='notes' type='checkbox' />
                    Include Notes
                </label>
                <button className='share-modal__button' type='submit'>Share</button>
            </form>
        </div>
    );
};

export default ShareModal;