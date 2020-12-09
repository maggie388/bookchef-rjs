import React, { Component } from 'react';
import './ScanModal.scss';

// ASSETS
import closeIcon from '../../assets/icons/close-sharp.svg';

// COMPONENTS
import UploadPreview from '../../components/UploadPreview/UploadPreview';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

class ScanModal extends Component {
    state = {
        showPreview: false,
        imageURL: '',
        file: ''
    }

    handleFileUpload = (e) => {
        this.setState({
            imageURL: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0], 
            showPreview: true
        });
    }

    handleFormSubmit = (e) => {
        const { readText, addToState, formatFn } = this.props;
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        readText(formData, addToState, formatFn);
        
    }

    handleClose = () => {
        this.props.close();
    }

    render() {
        return (
            <form className='scan-modal' onSubmit={this.handleFormSubmit}>
                <img className='scan-modal__close' onClick={this.handleClose} src={closeIcon} alt='' />
                {this.state.showPreview ? 
                    <UploadPreview imageURL={this.state.imageURL} /> : 
                    <ChooseButton handleFileUpload={this.handleFileUpload} />}
            </form>
        );
    }
}

export default ScanModal;