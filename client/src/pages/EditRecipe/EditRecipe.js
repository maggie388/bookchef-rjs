import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './EditRecipe.scss';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';


class EditRecipe extends Component {
    state = {
        isLoading: true,
        recipe: {}
    }

    getSingleRecipe = () => {
        axiosInstance.get(`/recipes/${this.props.match.params.recipeId}`)
        .then((response) => {
            this.setState({
                isLoading: false,
                recipe: response.data
            })
        })
        .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getSingleRecipe();
    }

    render() {
        if (this.state.isLoading) {
            return "Loading..."
        }

        return <RecipeForm h1Text='Edit Recipe' history={this.props.history} recipe={this.state.recipe}/>
    }
}

export default EditRecipe;