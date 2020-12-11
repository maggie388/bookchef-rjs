import React, { Component } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axios';
import './Home.scss';

// COMPONENTS
import RecipeList from '../../components/RecipeList/RecipeList';
import Login from '../../components/Login/Login';


const API_URL = process.env.REACT_APP_API_URL;

class Home extends Component {
    state = {
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: '',
        recipes: []
    }

    login = (username, password) => {
        axiosInstance.post('/login', { username, password })
            .then(({data : { token }}) => {
                sessionStorage.setItem('authToken', token);
                this.setState({
                    isLoginError: false, 
                    errorMessage: ''
                });
                axios.get(API_URL + '/recipes', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.setState({
                        isLoggedIn: true,
                        recipes: response.data
                    });
                }) 
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
        } else {
            this.setState({
                isLoggedIn: false
            })
        }
    }

    render() {
        if (this.state.isLoggedIn) {
            return <RecipeList recipes={this.state.recipes} />;
        }

        return <Login login={this.login} />;
    }
}

export default Home;