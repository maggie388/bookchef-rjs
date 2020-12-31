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
        recipes: []
    }

    login = (username, password) => {
        axiosInstance.post(`/login`, { username, password })
            .then(({data : { token }}) => {
                sessionStorage.setItem('authToken', token);
                this.setState({
                    isLoginError: false, 
                    errorMessage: ''
                });
                axiosInstance.get(`/recipes`)
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