import React from 'react';
import axios from 'axios';
import './Note.scss';

// IMPORTED COMPONENTS
import CloseButton from '../CloseButton/CloseButton';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

const Note = ({ note, updateNotes }) => {

    const removeNote = () => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.delete(`${API_URL}/notes/${note.id}`, axiosConfig)
            .then(() => {
                updateNotes();
                console.log('Delete Note');
            })
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