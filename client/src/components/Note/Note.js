import React from 'react';
import './Note.scss';

import CloseButton from '../CloseButton/CloseButton';

const Note = ({ note }) => {
    const removeNote = () => {
        console.log('Delete Note');
    }

    const formatedDate = new Date(note.created_at).toDateString();

    return (
        <li className='note'>
            <p className='note__text'>{note.text}</p>
            <p className='note__date'>{formatedDate}</p>
            <CloseButton alt='Delete Note' clickAction={removeNote} />
        </li>
    );
};

export default Note;