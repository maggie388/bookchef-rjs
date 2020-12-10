import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './Home.scss';

// COMPONENTS
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';
import Login from '../Login/Login';

class Home extends Component {
    state = {
        isLoggedIn: false,
        isLoading: true,
        isLoginError: false,
        errorMessage: '',
        recipes: []
    }

    login = (username, password) => {
        axiosInstance.post('/login', { username, password })
            .then(({ data: { error, token }}) => {
                if (error) {
                    console.log('login error');
                    this.setState({
                        isLoginError: true,
                        errorMessage: error.message
                    });
                    return;
                }
                sessionStorage.setItem('authToken', token)
                console.log('token received');
                this.setState({
                    isLoggedIn: true,
                    isLoginError: false, 
                    errorMessage: ''
                });
                
            })
            .catch(error => console.log(error));
    }

    sortByDate = (obj1, obj2) => {
        return new Date(obj2.created_at) - new Date(obj1.created_at);
    }

    getRecipes = () => {
        axiosInstance.get('/recipes')
            .then(response => {
                const sortedRecipes = response.data.sort(this.sortByDate);
                this.setState({
                    recipes: sortedRecipes,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))
    }

    deleteRecipe = (recipeId) => {
        axiosInstance.delete(`/recipes/${recipeId}`)
            .then(_response => {
                this.getRecipes();
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <main className='main'>
                    <Login login={this.login} />
                </main>
            )
        }

        if (this.state.isLoading) {
            return (
                <main className='main'>
                    <p>"Loading..."</p>
                </main>
            );
        }

        return (
            <main className='main'>
                <h1 className='main__title'>Recent Recipes</h1>
                <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </main>
        );
    }
}

export default Home;