import React from 'react';
import './NotesList.scss';

// IMPORTED COMPONENTS
import Note from '../Note/Note';

const NoteList = ({ notes, updateNotes }) => {
    return (
        <ul className='note-list'>
            {notes.map(note => {
                return <Note key={note.id} note={note} updateNotes={updateNotes} />
            })}
        </ul>
    );
};

export default NoteList;