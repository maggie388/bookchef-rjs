import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

// COMPONENTS
import Header from './components/Header/Header';

// PAGES
import Home from './pages/Home/Home';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Recipe from './pages/Recipe/Recipe';
import ActivationPage from './pages/ActivationPage/ActivationPage';
import SignUp from './pages/SignUp/SignUp';

// VARIABLES 
const Profile = () => 'Profile page is under construction';
export const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL_DEVELOPMENT;

class App extends Component {
  state = {
    isLoggedIn: false
  }

  toggleIsLoggedIn = (value) => {
    this.setState({
      isLoggedIn: value
    })
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route exact path='/' render={(routeProps) => {
                return <Home {...routeProps} isLoggedIn={this.state.isLoggedIn} toggleIsLoggedIn={this.toggleIsLoggedIn} />
              }} />
            <Route path='/recipe/add' component={AddRecipe} />
            <Route path='/recipe/edit/:recipeId' component={EditRecipe} />
            <Route path='/recipe/:recipeId' component={Recipe} />
            <Route path='/profile' component={Profile} />
            <Route path='/signup' component={SignUp} />
            <Route path='/activate/:activeToken' component={ActivationPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
