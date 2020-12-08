import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Recipe.scss';

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
        axios.get(API_URL + `/recipes/${this.props.recipe.id}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.log(error));
    }

    componentDidMount = () => {

    }

    render() {
        if (this.state.isLoading) {
            return "Loading...";
        }

        return (
            <div className='recipe'>
                <div className='recipe__top'>
                    <img className='recipe__pic' src='https://baconmockup.com/300/200' alt='' />
                </div>
                <div className='recipe__bottom'>
                    <div className='recipe__title-div'>
                        <Link to='/'>
                            <img className='recipe__go-back' src={backIcon} alt='Go Back' />
                        </Link>
                        <h1 className='recipe__title'>Garlic Mashed Cauliflower</h1>
                        <Link to='/'>
                            <img className='recipe__edit' src={editIcon} alt='Edit' />
                        </Link>
                    </div>
                    <div className='recipe__details-div'>
                        <h3 className='recipe__category'>Side Dish</h3>
                        <p className='recipe__source'> Love and Lemons Everyday, page 25</p>
                        <h2 className='recipe__subtitle'>Ingredients</h2>
                        <ul className='recipe__list recipe__list--ingredients'>
                            <li className='recipe__list-item'>1 medium head cauliflower, 2 pounds, chopped</li>
                            <li className='recipe__list-item'>2 tbsp melted butter or vegan butter</li>
                            <li className='recipe__list-item'>7 cloves roasted garlic</li>
                            <li className='recipe__list-item'>1/8 to 1/4 tsp Dijon mustard</li> <li>1/4 to 1/2 tsp sea salt</li>
                            <li className='recipe__list-item'>Freshly ground black pepper</li>
                            <li className='recipe__list-item'>Chives, for garnish, optional</li>
                        </ul>
                        <h2 className='recipe__subtitle'>Instructions</h2>
                        <ul className='recipe__list recipe__list--instructions'>
                            <li  className='recipe__list-item'>Bring a large pot of salted water to a boil. Add the cauliflower and boil until knife-tender, about 10 minutes. Drain and transfer to a food processor.</li>
                            <li  className='recipe__list-item'>Puree the cauliflower with the butter, garlic, mustard, salt, and pepper. Season to taste and garnish with chives, if desired.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipe;