import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './EditRecipe.scss';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import Loading from '../../components/Loading/Loading';


class EditRecipe extends Component {
    state = {
        isLoading: true,
        notFound: false,
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
        .catch((error) => {
            this.setState({
                isLoading: false, 
                notFound: true
            });
            console.log(error)
        });
    }

    componentDidMount() {
        this.getSingleRecipe();
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        if (this.state.notFound) {
            return '404 Recipe Not Found';
        }

        return <RecipeForm h1Text='Edit Recipe' history={this.props.history} recipe={this.state.recipe}/>
    }
}

export default EditRecipe;