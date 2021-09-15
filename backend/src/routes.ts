import { Router } from 'express';
<<<<<<< HEAD
import SignUp from './controller/SignUp/SignUp';
import Signin from './controller/SignIn/Signin';
=======
import { AddPokemonControler } from './controller/AddPokemonUseCase/AddPokemonController';
import { DetailsPokemonController } from './controller/DetailsPokemonUseCase/DetailsPokemonController';
import { ExcludePokemonController } from './controller/ExcludePokemonUseCase/ExcludePokemonController';
import { FillterPokemonsController } from './controller/FillterPokemonsUseCase/FillterPokemonsController';
import { FindCapturedPokemonsController } from './controller/FindCapturedPokemonsUseCase/FindCapturedPokemonsController';
import TrainerController from './controller/SignUp/SignUp';
>>>>>>> cbd9c59d3dfc4dca88d799612fca5c1c29814487

const addPokemonControler = new AddPokemonControler();
const findCapturedPokemonsController = new FindCapturedPokemonsController();
const detailsPokemonController = new DetailsPokemonController();
const excludePokemonController = new ExcludePokemonController();
const fillterPokemonsController = new FillterPokemonsController();

const routes = Router();

routes.get('/', (request, response) => response.json());
<<<<<<< HEAD
routes.post('/signup', SignUp.store );
routes.post('/signin', Signin.authenticate );
=======
routes.post('/signup', TrainerController.store);

routes
  .post('/pokemons', addPokemonControler.handle)
  .get('/pokemons', findCapturedPokemonsController.handle)
  .get('/pokemons/filter', fillterPokemonsController.handle)
  .get('/pokemons/:poke_id', detailsPokemonController.handle)
  .delete('/pokemons/:poke_id', excludePokemonController.handle);

>>>>>>> cbd9c59d3dfc4dca88d799612fca5c1c29814487
export { routes };
