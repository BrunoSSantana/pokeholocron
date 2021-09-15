/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class ExcludePokemonController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { poke_id } = request.params;

      const pokemon = await pokemonsRepositories.delete(poke_id);

      return response.json(pokemon);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { ExcludePokemonController };
