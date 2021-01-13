import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './RecipeList.scss';
import _ from 'lodash';

// COMPONENTS
import RecipeListContainer from '../../components/RecipeListContainer/RecipeListContainer';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddRecipeButton from '../../components/AddRecipeButton/AddRecipeButton';

class RecipeList extends Component {
    state = {
        isLoading: true,
        allRecipes: [],
        recipes: []
    }

    getRecipes = () => {
        axiosInstance.get(`/recipes`)
            .then(response => {
                this.setState({
                    isLoading: false,
                    allRecipes: response.data.sort(this.sortByDate),
                    recipes: response.data.sort(this.sortByDate)
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

    filterRecipes = (searchQuery, filterBy) => {
        if (searchQuery === '' && filterBy === '') {
            this.setState({
                recipes: _.cloneDeep(this.state.allRecipes)
            })
        } else if (searchQuery === '' && filterBy) {
            const recipes = _.cloneDeep(this.state.allRecipes);
            const filteredRecipes = recipes.filter(recipe => recipe.category === filterBy);
            this.setState({
                recipes: filteredRecipes
            }) 
        } else if (searchQuery && filterBy) {
            const recipes = this.state.recipes;
            const filteredRecipes = recipes.filter(recipe => recipe.category === filterBy);
            this.setState({
                recipes: filteredRecipes
            })
        }
    }

    search = (searchQuery, filterBy) => {
        if (searchQuery === '' && filterBy === '') {
            this.setState({
                recipes: _.cloneDeep(this.state.allRecipes)
            })
        } else if (searchQuery === '' && filterBy) {
            this.filterRecipes(searchQuery, filterBy);
        } else if (searchQuery) {
            axiosInstance.get(`/search?query=${searchQuery}`)
            .then(response => {
                const recipes = filterBy ? response.data.filter(recipe => recipe.category === filterBy) : response.data;
                this.setState({
                    recipes
                });
            })
            .catch(error => console.log(error));
        }
    }

    

    resetRecipes = () => {
        this.setState({
            recipes: _.cloneDeep(this.state.allRecipes)
        })
    }

    componentWillMount() {
        if (this.props.recipes.length > 0) {
            const sortedRecipes = this.props.recipes.sort(this.sortByDate);
            this.setState({
                allRecipes: _.cloneDeep(sortedRecipes),
                recipes: _.cloneDeep(sortedRecipes),
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
                    <AddRecipeButton />
                    <SearchBar search={this.search} filterRecipes={this.filterRecipes} reset={this.resetRecipes} />
                </div>
                <RecipeListContainer recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </main>
        );
    }
};

export default RecipeList;