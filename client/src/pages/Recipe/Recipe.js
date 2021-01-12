import React, { Component } from 'react';
import axiosInstance from '../../utils/axios';
import './Recipe.scss';

// COMPONENTS
import BodyHeader from '../../components/BodyHeader/BodyHeader';
import Loading from '../../components/Loading/Loading';
import NotesContainer from '../../components/NotesContainer/NotesContainer';
import ShareModal from '../../components/ShareModal/ShareModal';

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
        notes: '',
        showShareModal: false
    }

    getSingleRecipe = () => {
        axiosInstance.get(`/recipes/${this.props.match.params.recipeId}`)
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

    toggleShare = () => {
        this.setState({
            showShareModal: this.state.showShareModal ? false : true
        })
    }

    shareRecipe = (id, email, notes) => {
        axiosInstance.post(`/recipes/${this.props.match.params.recipeId}/share`, { email, notes })
        .then(_response => {
            this.toggleShare();
        })
        .catch(error => console.log(error))
        
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
                        toggleShare={this.toggleShare}
                    />
                    <div className='recipe__details-div'>
                        <h3 className='recipe__category'>{category}</h3>
                        <p className='recipe__source'>{book}, page {page}</p>
                        <div className='recipe__side-by-side'>
                            <div className='recipe__side-pic-container'>
                                {image && recipePic}
                            </div>
                            <div>
                                <h2 className='recipe__subtitle'>Ingredients</h2>
                                <ul 
                                    className='recipe__list recipe__list--ingredients' 
                                    dangerouslySetInnerHTML={{ __html: ingredients }}>
                                </ul>
                            </div>
                        </div>
                        
                        <h2 className='recipe__subtitle'>Instructions</h2>
                        <ul 
                            className='recipe__list recipe__list--instructions'
                            dangerouslySetInnerHTML={{ __html: instructions }}>
                        </ul>
                        <NotesContainer recipeId={this.props.match.params.recipeId} notes={this.state.notes} updateNotes={this.getSingleRecipe} />
                    </div>
                </div>
                {this.state.showShareModal ? 
                    <ShareModal 
                        recipeId={this.props.match.params.recipeId} 
                        toggleShare={this.toggleShare} 
                        shareRecipe={this.shareRecipe}
                    /> : ''}
            </main>
        );
    }
}

export default Recipe;