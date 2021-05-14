import React from 'react';
import './ShareModal.scss';


// COMPONENTS
import IconButton from '../../components/IconButton/IconButton';

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
                <IconButton 
                    type='close'
                    size='small'
                    alt='close share modal'
                    clickAction={toggleShare}
                />
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