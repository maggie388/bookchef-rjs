import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ScanModal.scss';

// ASSETS
import scanIcon from '../../assets/icons/scan-outline.svg';

// COMPONENTS
import IconButton from '../../components/IconButton/IconButton';
import ChooseButton from '../../components/ChooseButton/ChooseButton';

class ScanModal extends PureComponent {
    state = {
        file: '',
        file2: '',
        src: null,
        crop: {
            unit: '%',
            width: 80,
            height: 80,
            x: 0,
            y: 0
        }
    }

    handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({
                    src: reader.result,
                    file: e.target.files[0], 
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onImageLoaded = (image) => {
        this.imageRef = image;
    }

    onCropComplete = (crop) => {
        this.makeClientCrop(crop);
    }

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop: percentCrop })
    }

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl })
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth /image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height= crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is Empty');
                    return;
                }
                blob.name = fileName;
                blob.lastModifiedDate = new Date();
                this.setState({
                    file2: blob
                });
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/png', 1);
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { readText, addToState, formatFn } = this.props;
        const formData = new FormData();
        formData.append('file', this.state.file2);
        readText(formData, addToState, formatFn);
    }

    handleClose = () => {
        this.props.close();
    }

    renderCropView = () => {
        return (
            <>
                <div className='scan-modal__crop-div'>
                <ReactCrop 
                    className='scan-modal__crop-view'
                    src={this.state.src}
                    crop={this.state.crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                /> 
                </div>
                <div className='scan-modal__bottom'>
                    <IconButton 
                        type='right arrow'
                        size='large'
                        alt='continue'
                    />
                </div>
            </>
        );
    }

    render() {
        return (
            <form className='scan-modal' onSubmit={this.handleFormSubmit}>
                <div className='scan-modal__top'>
                    <p>Crop your image for best results.</p>
                    <IconButton 
                        type='close'
                        size='large'
                        alt='close'
                        clickAction={this.handleClose}
                    />
                </div>
                {this.state.src ? this.renderCropView() : <ChooseButton icon={scanIcon} handleFileUpload={this.handleFileUpload} />}
            </form>
        );
    }
}

export default ScanModal;