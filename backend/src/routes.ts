import { Router } from 'express';
import SignUp from './controller/SignUp/SignUp';
import Signin from './controller/SignIn/Signin';
import { AddPokemonControler } from './controller/AddPokemonUseCase/AddPokemonController';
import { DetailsPokemonController } from './controller/DetailsPokemonUseCase/DetailsPokemonController';
import { ExcludePokemonController } from './controller/ExcludePokemonUseCase/ExcludePokemonController';
import { FillterPokemonsController } from './controller/FillterPokemonsUseCase/FillterPokemonsController';
import { FindCapturedPokemonsController } from './controller/FindCapturedPokemonsUseCase/FindCapturedPokemonsController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const addPokemonControler = new AddPokemonControler();
const findCapturedPokemonsController = new FindCapturedPokemonsController();
const detailsPokemonController = new DetailsPokemonController();
const excludePokemonController = new ExcludePokemonController();
const fillterPokemonsController = new FillterPokemonsController();

const routes = Router();

routes.get('/', (request, response) => response.json());
routes.post('/signup', SignUp.store);
routes.post('/signin', Signin.authenticate);

routes
  .post('/pokemons', ensureAuthenticated, addPokemonControler.handle)
  .get('/myPokemons', ensureAuthenticated, findCapturedPokemonsController.handle)
  .post('/pokemons/filter', ensureAuthenticated, fillterPokemonsController.handle)
  .get('/pokemons/:poke_id', detailsPokemonController.handle)
  .delete('/pokemons', ensureAuthenticated, excludePokemonController.handle);

export { routes };
