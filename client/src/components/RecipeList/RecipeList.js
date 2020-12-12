import React, { Component } from 'react';
import axios from 'axios';
// import axiosInstance from '../../utils/axios';
import './RecipeList.scss';

// COMPONENTS
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class RecipeList extends Component {
    state = {
        isLoading: true,
        recipes: []
    }

    getRecipes = () => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.get(`${API_URL}/recipes`, axiosConfig)
            .then(response => {
                const sortedRecipes = response.data.sort(this.sortByDate);
                this.setState({
                    isLoading: false,
                    recipes: sortedRecipes
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    sortByDate(obj1, obj2) {
        return new Date(obj2.created_at) - new Date(obj1.created_at);
    }

    deleteRecipe = (recipeId) => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.delete(`${API_URL}/recipes/${recipeId}`, axiosConfig)
            .then(_response => {
                this.getRecipes();
            })
            .catch(error => console.log(error));
    }

    search = (query) => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.get(`${API_URL}/search?query=${query}`, axiosConfig)
            .then(response => {
                this.setState({
                    recipes: response.data
                });
            })
            .catch(error => console.log(error))
    }

    componentWillMount() {
        if (this.props.recipes.length > 0) {
            const sortedRecipes = this.props.recipes.sort(this.sortByDate);
            this.setState({
                recipes: sortedRecipes,
                isLoading: false
            });
            return;
        }
        this.getRecipes();
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <main className='recipe-list'>
                <div className='recipe-list__title-group'>
                    <h1 className='recipe-list__title'>Recent Recipes</h1>
                    <SearchBar search={this.search} />
                </div>
                <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </main>
        );
    }
};

export default RecipeList;