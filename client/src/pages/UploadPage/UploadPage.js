import React, { Component } from 'react';
import axios from 'axios';
import './UploadPage.scss';

// COMPONENTS
import UploadForm from '../../components/UploadForm/UploadForm';

const API_URL = process.env.REACT_APP_API_URL;

class UploadPage extends Component {
    state = {
        imageURL: '',
        file: ''
        // showPreview: false
    }

    postImage = (formData) => {
        axios.post(API_URL + '/upload', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.imageURL !== this.state.imageURL) {
    //         this.setState({
    //             showPreview: true
    //         })
    //     }
    // }

    // event for choose button
    handleFileUpload = (e) => {
        this.setState({
            imageURL: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }

    // event for cancel button and to use after submit
    goBack = () => {
        this.props.history.goBack();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        this.postImage(formData);
        // console.log('File Submitted :::', e.target.image.value);
        this.goBack();
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

export default UploadPage;