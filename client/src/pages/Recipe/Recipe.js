import React, { Component } from 'react';
import './Recipe.scss';

// ASSETS
import backIcon from '../../assets/icons/arrow-back-sharp.svg';

class Recipe extends Component {
    state = {
        recipeId: '',
        image: '',
        title: '',
        book: '',
        page: '',
        category: '',
        ingredients: '',
        instructions: ''
    }

    render() {
        return (
            <div className='recipe'>
                <div className='recipe__top'>
                    <img className='recipe__pic' src='https://baconmockup.com/300/200' alt='' />
                </div>
                <div className='recipe__bottom'>
                    <div className='recipe__title-div'>
                        <img className='recipe__go-back' src={backIcon} alt='' />
                        <h1 className='recipe__title'>Garlic Mashed Cauliflower</h1>
                    </div>
                    <p>Love and Lemons, page 25</p>
                    <p>Side Dish</p>
                    <h2>Ingredients</h2>
                    <ul>
                        <li>1 medium head cauliflower, 2 pounds, chopped</li>
                        <li>2 tbsp melted butter or vegan butter</li>
                        <li>7 cloves roasted garlic</li>
                        <li>1/8 to 1/4 tsp Dijon mustard</li> <li>1/4 to 1/2 tsp sea salt</li>
                        <li>Freshly ground black pepper</li>
                        <li>Chives, for garnish, optional</li>
                    </ul>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Bring a large pot of salted water to a boil. Add the cauliflower and boil until knife-tender, about 10 minutes. Drain and transfer to a food processor.</li>
                        <li>Puree the cauliflower with the butter, garlic, mustard, salt, and pepper. Season to taste and garnish with chives, if desired.</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Recipe;