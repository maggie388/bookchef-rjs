import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from './components/Header/Header';
const Profile = () => 'Profile page is under construction';

// PAGES
import Home from './pages/Home/Home';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Recipe from './pages/Recipe/Recipe';
import ActivationPage from './pages/ActivationPage/ActivationPage';
import SignUp from './pages/SignUp/SignUp';

// VARIABLES 
export const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL_DEVELOPMENT;

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
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

export default App;
