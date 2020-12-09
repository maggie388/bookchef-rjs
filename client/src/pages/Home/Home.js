import React, { Component } from 'react';
import axios from 'axios';
import './Home.scss';

// COMPONENTS
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class Home extends Component {
    state = {
        isLoading: true,
        recipes: []
    }

    getRecipes = () => {
        axios.get(API_URL + '/recipes')
            .then(response => {
                // console.log(response.data);
                this.setState({
                    recipes: response.data,
                    isLoading: false
                });
            })
            .catch(error => console.log(error))
    }

    deleteRecipe = (recipeId) => {
        axios.delete(API_URL + `/recipes/${recipeId}`)
            .then(_response => {
                this.getRecipes();
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        if (this.state.isLoading) {
            return "Loading...";
        }

        return (
            <main className='main'>
                <h1 className='main__title'>Recent</h1>
                <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </main>
        );
    }
}

export default Home;