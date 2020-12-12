import React, { Component} from 'react';
import './NotesContainer.scss';

// COMPONENTS
import AddButton from '../AddButton/AddButton';
import Note from '../Note/Note';
import NotesList from '../NotesList/NotesList';

class NotesContainer extends Component {
    state = {
        addNote: false
    }

    toggleAddNote = () => {
        this.setState({
            addNote: this.state.addNote ? false : true
        })
    }

    render () {
        const { recipeId, notes, updateNotes } = this.props;
        return (
            <main className='notes-container'>
                <div className='notes-container__title-group'>
                    <h2 className='notes-container__title'>Notes</h2>
                    <AddButton alt='Add Note' clickAction={this.toggleAddNote} />
                </div>
                {this.state.addNote && <Note recipeId={recipeId} toggleAddNote={this.toggleAddNote} updateNotes={updateNotes} isEditable />}
                <NotesList notes={notes} updateNotes={updateNotes} />
            </main>
        );
    }
};

export default NotesContainer;