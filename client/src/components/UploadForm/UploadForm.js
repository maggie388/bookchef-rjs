import React, { Component } from 'react';
import './UploadForm.scss';

// COMPONENTS
// import UploadPreview from '../../components/UploadPreview/UploadPreview';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

class UploadForm extends Component {
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
        const { readText, addToState, formatFn } = this.props;
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        readText(formData, addToState, formatFn);
    }

    render() {
        return (
            <form className='upload-form' onSubmit={this.handleFormSubmit}>
                {/* <UploadPreview imageURL={imageURL} />  */}
                <ChooseButton 
                    handleFileUpload={this.handleFileUpload}
                    imageURL={imageURL} />
            </form>
        );
    }
};

export default UploadForm;