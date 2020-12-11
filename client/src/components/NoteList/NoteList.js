import React from 'react';
import './NoteList.scss';

import Note from '../Note/Note';

const NoteList = ({ notes }) => {
    return (
        <ul className='note-list'>
            {notes.map(note => {
                return <Note key={note.id} note={note} />
            })}
        </ul>
    );
};

export default NoteList;