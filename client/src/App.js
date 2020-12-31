import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from './components/Header/Header';

// PAGES
import Home from './pages/Home/Home';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Recipe from './pages/Recipe/Recipe';

const Profile = () => 'this is the profile page';
const SignUp = () => 'this is the Sign Up page';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
