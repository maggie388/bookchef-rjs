import React, { Component } from 'react';
import './ActivationPage.scss';
import axiosInstance from '../../utils/axios';

// COMPONENTS
import Loading from '../../components/Loading/Loading';

class ActivationPage extends Component {
    state = {
        message: ''
    }

    componentDidMount() {
        console.log(this.props.match.params.activeToken);
        axiosInstance.post(`/account/activate/${this.props.match.params.activeToken}`)
            .then(response => {
                this.setState({
                    message: response.data.message
                })
            })
            .catch(error => {
                console.log('error ::', error)
                this.setState({
                    message: '404 Page Not Found'
                })
            });
    }

    render() {
        if (this.state.message === '') {
            return <Loading />;
        }

        return (
            <div className='activation-page'>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default ActivationPage;