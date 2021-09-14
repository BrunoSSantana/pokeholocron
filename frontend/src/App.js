import { Switch, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';

function App() {

  return (
    <>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/pokedex' component={Pokedex} />
      </Switch>
    </>
  );
}

export default App;