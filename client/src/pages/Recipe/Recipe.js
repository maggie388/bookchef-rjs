import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Recipe.scss';

// COMPONENTS
import Header from '../../components/Header/Header';

// ASSETS
import backIcon from '../../assets/icons/arrow-back-sharp.svg';
import editIcon from '../../assets/icons/pencil-sharp.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class Recipe extends Component {
    state = {
        isLoading: true,
        recipeId: this.props.match.params.recipeId,
        image: '',
        title: '',
        book: '',
        page: '',
        category: '',
        ingredients: '',
        instructions: ''
    }

    getSingleRecipe = () => {
        axios.get(API_URL + `/recipes/${this.props.match.params.recipeId}`)
        .then((response) => {
            const { image, title, book, page, category, ingredients, instructions } = response.data;
            this.setState({
                isLoading: false,
                image: image,
                title: title,
                book: book,
                page: page,
                category: category,
                ingredients: ingredients,
                instructions: instructions
            })
        })
        .catch((error) => console.log(error));
    }

    componentDidMount = () => {
        this.getSingleRecipe();
    }

    render() {
        const {title, book, page, category, ingredients, instructions} = this.state;

        if (this.state.isLoading) {
            return "Loading...";
        }

        return (
            <main className='recipe'>
                <div className='recipe__top'>
                    <img className='recipe__pic' src='https://baconmockup.com/300/200' alt='' />
                </div>
                <div className='recipe__bottom'>
                    <div className='recipe__title-div'>
                        <Link to='/'>
                            <img className='recipe__go-back' src={backIcon} alt='Go Back' />
                        </Link>
                        <h1 className='recipe__title'>{title}</h1>
                        <Link to={`/recipe/edit/${this.state.recipeId}`}>
                            <img className='recipe__edit' src={editIcon} alt='Edit' />
                        </Link>
                    </div>
                    <div className='recipe__details-div'>
                        <h3 className='recipe__category'>{category}</h3>
                        <p className='recipe__source'>{book}, page {page}</p>
                        <h2 className='recipe__subtitle'>Ingredients</h2>
                        <ul 
                            className='recipe__list recipe__list--ingredients' 
                            dangerouslySetInnerHTML={{ __html: ingredients }}>
                        </ul>
                        <h2 className='recipe__subtitle'>Instructions</h2>
                        <ul 
                            className='recipe__list recipe__list--instructions'
                            dangerouslySetInnerHTML={{ __html: instructions }}>
                        </ul>
                    </div>
                </div>
            </main>
        );
    }
}

export default Recipe;