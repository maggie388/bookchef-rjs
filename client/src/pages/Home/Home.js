import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './Home.scss';

// COMPONENTS
import RecipeList from '../../components/RecipeList/RecipeList';
import Login from '../../components/Login/Login';

class Home extends Component {
    state = {
        isLoginError: false,
        errorMessage: '',
        recipes: []
    }

    login = (email, password) => {
        axiosInstance.post(`/account/login`, { email, password })
            .then(({data : { token }}) => {
                sessionStorage.setItem('authToken', token);
                this.props.toggleIsLoggedIn(true);
                this.setState({
                    isLoginError: false, 
                    errorMessage: ''
                });
                axiosInstance.get(`/recipes`)
                .then(response => {
                    this.setState({
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
            this.props.toggleIsLoggedIn(true);
        } else {
            this.props.toggleIsLoggedIn(false);
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return <RecipeList recipes={this.state.recipes} />;
        }
        return <Login login={this.login} />;
    }
}

export default Home;