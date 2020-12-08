import React, { Component } from 'react';
import axios from 'axios';
import './Home.scss';

// COMPONENTS
import Header from '../../components/Header/Header';
// import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';
import HomeNav from '../../components/HomeNav/HomeNav';

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
            <>
                <Header />
                <main className='main'>
                    <h1 className='main__title'>Recent</h1>
                    <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
                </main>
                {/* <HomeNav /> */}
            </>
        );
    }
}

export default Home;