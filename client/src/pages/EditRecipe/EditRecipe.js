import React, { Component } from 'react';
import axios from 'axios';
import './EditRecipe.scss';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class EditRecipe extends Component {
    state = {
        isLoading: true,
        recipe: {}
    }

    getSingleRecipe = () => {
        axios.get(API_URL + `/recipes/${this.props.match.params.recipeId}`)
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

        return <RecipeForm h1Text='Edit Recipe' recipe={this.state.recipe}/>
    }
}

export default EditRecipe;