import React, { Component } from 'react';
import axios from 'axios';
// import axiosInstance from '../../utils/axios';
import './Home.scss';

// COMPONENTS
import RecipeList from '../../components/RecipeList/RecipeList';
import Login from '../../components/Login/Login';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class Home extends Component {
    state = {
        isLoggedIn: false,
        isLoginError: false,
        errorMessage: '',
        recipes: []
    }

    login = (username, password) => {
        axios.post(`${API_URL}/login`, { username, password })
            .then(({data : { token }}) => {
                sessionStorage.setItem('authToken', token);
                this.setState({
                    isLoginError: false, 
                    errorMessage: ''
                });
                const authToken = sessionStorage.getItem('authToken');
                const axiosConfig = {
                    headers: {
                        authorization: `Bearer ${authToken}`
                    }
                };
                axios.get(`${API_URL}/recipes`, axiosConfig)
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
                console.log(error);
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