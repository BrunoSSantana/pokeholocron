/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class DetailsPokemonController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { poke_id } = request.params;
//001 bulbasaur

      const pokemon = await pokemonsRepositories
        .createQueryBuilder('pokemons')
        .where('pokemons.poke_id = :poke_id', { poke_id })
        .getOne();

        //return 1 pokemon

      return response.json(pokemon);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { DetailsPokemonController };
