import React, { Component } from 'react';
import './ScanModal.scss';

// COMPONENTS
import UploadForm from '../UploadForm/UploadForm';

class ScanModal extends Component {
    state = {
        imageURL: '',
        file: ''
    }

    handleFileUpload = (e) => {
        this.setState({
            imageURL: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }

    handleFormSubmit = (e) => {
        const { readText, addToState } = this.props;
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        readText(formData, addToState);
    }

    render() {
        return (
            <div className='upload-page'>
                <UploadForm 
                    showPreview={this.state.showPreview}
                    imageURL={this.state.imageURL}
                    handleFormSubmit={this.handleFormSubmit}
                    handleFileUpload={this.handleFileUpload}
                />
            </div>
        );
    }
}

export default ScanModal;