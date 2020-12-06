import React, { Component } from 'react';
import './Home.scss';

// COMPONENTS
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import HomeNav from '../../components/HomeNav/HomeNav';

// ASSETS


class Home extends Component {
    render() {
        return (
            <>
                <Header />
                <main className='main'>
                    <h1 className='main__title'>Recent</h1>
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </main>
                <HomeNav />
            </>
        );
    }
}

export default Home;