import { Switch, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

function App() {

  return (
    <>
      <Switch>
        <Route path='/Login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute path='/' exact component={Home} />
        <ProtectedRoute path='/pokedex' component={Pokedex} />
      </Switch>
    </>
  );
}

export default App;