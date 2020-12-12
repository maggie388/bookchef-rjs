import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';
import './Note.scss';

// IMPORTED COMPONENTS
import CloseButton from '../CloseButton/CloseButton';
import EditButton from '../EditButton/EditButton';
import SaveButton from '../SaveButton/SaveButton';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

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
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.put(`${API_URL}/notes/${this.state.note.id}`, { text: this.state.text }, axiosConfig)
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
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.post(`${API_URL}/notes`, { text: this.state.text, recipeId: this.props.recipeId }, axiosConfig)
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
        this.addNewNote();
        this.props.toggleAddNote();
    }

    removeNote = () => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.delete(`${API_URL}/notes/${this.state.note.id}`, axiosConfig)
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
                {/* <p className='note__date'>{formatedDate}</p> */}
                {isEditable ? <SaveButton alt='Save Note' clickAction={this.handleSave} /> : <EditButton alt='Edit Note' clickAction={this.editNote} />}
                <CloseButton alt='Delete Note' clickAction={this.handleClose} />
            </li>
        );
    }
};

export default Note;