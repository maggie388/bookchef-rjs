import React, { Component } from 'react';
import axios from 'axios';
// import axiosInstance from '../../utils/axios';
import './Recipe.scss';

// COMPONENTS
import BodyHeader from '../../components/BodyHeader/BodyHeader';
import Loading from '../../components/Loading/Loading';
import NotesContainer from '../../components/NotesContainer/NotesContainer';

// ASSETS
import editIcon from '../../assets/icons/pencil-sharp.svg';

// VARIABLES
const API_URL = process.env.REACT_APP_API_URL;

class Recipe extends Component {
    state = {
        isLoading: true,
        notFound: false,
        image: '',
        title: '',
        book: '',
        page: '',
        category: '',
        ingredients: '',
        instructions: '', 
        notes: ''
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
            const { image, title, book, page, category, ingredients, instructions, notes } = response.data;
            const sortedNotes = notes.sort(this.sortByDate);
            this.setState({
                isLoading: false,
                image: image,
                title: title,
                book: book,
                page: page,
                category: category,
                ingredients: ingredients,
                instructions: instructions,
                notes: sortedNotes
            })
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                notFound: true,
            });
            console.log(error);
        });
    }

    sortByDate(obj1, obj2) {
        return new Date(obj2.created_at) - new Date(obj1.created_at);
    }

    componentDidMount = () => {
        this.getSingleRecipe();
    }

    render() {
        const {isLoading, notFound, title, book, page, category, ingredients, instructions, image} = this.state;

        if (isLoading) {
            return <Loading />;
        }

        if (notFound) {
            return '404 Recipe Not Found';
        }

        const recipePic = image && <img className='recipe__pic' src={`${API_URL}/${image}`} alt={title} />;

        return (
            <main className='recipe'>
                <div className='recipe__top'>
                    {image && recipePic}
                </div>
                <div className='recipe__bottom'>
                    <BodyHeader 
                        goBack={this.props.history.goBack}
                        h1Text={title}
                        icon={editIcon}
                        recipeId={this.props.match.params.recipeId}
                    />
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
                        <NotesContainer recipeId={this.props.match.params.recipeId} notes={this.state.notes} updateNotes={this.getSingleRecipe} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Recipe;