import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './Home.scss';

// COMPONENTS
import RecipeList from '../../components/RecipeList/RecipeList';
import Login from '../../components/Login/Login';

class Home extends Component {
    state = {
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: '',
    }

    login = (username, password) => {
        axiosInstance.post('/login', { username, password })
            .then(({data : { token }}) => {
                sessionStorage.setItem('authToken', token);
                this.setState({
                    isLoggedIn: true,
                    isLoginError: false, 
                    errorMessage: ''
                });
            })
            .catch(error => {
                this.setState({
                    isLoginError: true,
                    errorMessage: 'Login failed'
                });
            });
    }

    componentWillMount() {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            this.setState({
                isLoggedIn: true
            });
        }
    }

    render() {
        if (this.state.isLoggedIn) {
            return <RecipeList />;
        }

        return <Login login={this.login} />;
    }
}

export default Home;