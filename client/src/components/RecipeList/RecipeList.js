import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './RecipeList.scss';

// COMPONENTS
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';
import Loading from '../../components/Loading/Loading';

class RecipeList extends Component {
    state = {
        isLoading: true,
        recipes: []
    }

    getRecipes = () => {
        axiosInstance.get('/recipes')
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
        axiosInstance.delete(`/recipes/${recipeId}`)
            .then(_response => {
                this.getRecipes();
            })
            .catch(error => console.log(error));
    }

    componentWillMount() {
        if (this.props.recipes.length > 0) {
            const sortedRecipes = this.props.recipes.sort(this.sortByDate);
            this.setState({
                recipes: sortedRecipes
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
                <h1 className='recipe-list__title'>Recent Recipes</h1>
                <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </main>
        );
    }
};

export default RecipeList;