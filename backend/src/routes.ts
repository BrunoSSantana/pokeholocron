import { Router } from 'express';
import { AddPokemonControler } from './controller/AddPokemonUseCase/AddPokemonController';
import { DetailsPokemonController } from './controller/DetailsPokemonUseCase/DetailsPokemonController';
import { ExcludePokemonController } from './controller/ExcludePokemonUseCase/ExcludePokemonController';
import { FillterPokemonsController } from './controller/FillterPokemonsUseCase/FillterPokemonsController';
import { FindCapturedPokemonsController } from './controller/FindCapturedPokemonsUseCase/FindCapturedPokemonsController';
import TrainerController from './controller/SignUp/SignUp';

const addPokemonControler = new AddPokemonControler();
const findCapturedPokemonsController = new FindCapturedPokemonsController();
const detailsPokemonController = new DetailsPokemonController();
const excludePokemonController = new ExcludePokemonController();
const fillterPokemonsController = new FillterPokemonsController();

const routes = Router();

routes.get('/', (request, response) => response.json());
routes.post('/signup', TrainerController.store);

routes
  .post('/pokemons', addPokemonControler.handle)
  .get('/pokemons', findCapturedPokemonsController.handle)
  .get('/pokemons/filter', fillterPokemonsController.handle)
  .get('/pokemons/:poke_id', detailsPokemonController.handle)
  .delete('/pokemons/:id', excludePokemonController.handle);

export { routes };
