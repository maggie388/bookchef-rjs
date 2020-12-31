import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import axiosInstance from '../../utils/axios';
import './Note.scss';

// IMPORTED COMPONENTS
import CloseButton from '../CloseButton/CloseButton';
import EditButton from '../EditButton/EditButton';
import SaveButton from '../SaveButton/SaveButton';

class Note extends Component {
    constructor(props) {
        super();
        this.editableText = React.createRef();
        this.state = {
            note: props.note || '',
            text: (props.note && props.note.text) || '',
            isEditable: props.isEditable ? true : false
        };
    }

    editNote = () => {
        this.setState({
            isEditable: true
        });
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    saveEditedNote = () => {
        axiosInstance.put(`/notes/${this.state.note.id}`, { text: this.state.text })
            .then(() => {
                this.setState({
                    isEditable: false
                });
                this.props.updateNotes();
                console.log('Edited Note');
            })
            .catch(error => console.log(error))
    }

    addNewNote = () => {
        axiosInstance.post(`/notes`, { text: this.state.text, recipeId: this.props.recipeId })
            .then(() => {
                this.setState({
                    isEditable: false
                });
                this.props.updateNotes();
                console.log('Added a Note');
            })
            .catch(error => console.log(error))
    }

    handleSave = () => {
        if (this.props.note) {
            return this.saveEditedNote();
        }
        this.props.toggleAddNote();
        this.addNewNote();
    }

    removeNote = () => {
        axiosInstance.delete(`/notes/${this.state.note.id}`)
            .then(() => {
                this.props.updateNotes();
                console.log('Delete Note');
            })
            .catch(error => console.log(error))
    }

    handleClose = () => {
        if (this.props.note) {
            return this.removeNote();
        }
        this.props.toggleAddNote();
    }

    renderEditableText = () => {
        return (
            <ContentEditable 
                className='note__text note__text--editable'
                innerRef={this.editableNote}
                html={this.state.text}
                disabled={false}
                onChange={this.handleTextChange}
                tagName='p'
            />
        );
    }

    render () {
        const { isEditable, note } = this.state;
        const formatedDate = new Date(note.created_at).toDateString();

        return (
            <li className='note'>
                {isEditable ? this.renderEditableText() : <p className='note__text'>{this.state.text}</p>}
                {this.props.note &&  <p className='note__date'>{formatedDate}</p>}
                {isEditable ? <SaveButton alt='Save Note' clickAction={this.handleSave} /> : <EditButton alt='Edit Note' clickAction={this.editNote} />}
                <CloseButton alt='Delete Note' clickAction={this.handleClose} />
            </li>
        );
    }
};

export default Note;