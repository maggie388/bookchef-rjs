import React, { Component } from 'react';
import axios from 'axios';
// import axiosInstance from '../../utils/axios';
import './EditRecipe.scss';

// COMPONENTS
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import Loading from '../../components/Loading/Loading';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;


class EditRecipe extends Component {
    state = {
        isLoading: true,
        notFound: false,
        recipe: {}
    }

    getSingleRecipe = () => {
        const authToken = sessionStorage.getItem('authToken');
        const axiosConfig = {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        };
        axios.get(`${API_URL}/recipes/${this.props.match.params.recipeId}`, axiosConfig)
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