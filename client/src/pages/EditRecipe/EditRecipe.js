import React, { Component } from 'react';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';

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
        return <RecipeForm h1Text='Edit Recipe'/>
    }
}

export default EditRecipe;