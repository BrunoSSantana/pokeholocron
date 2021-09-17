/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class ExcludePokemonController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { id } = request.params;

      const { trainer_id } = request;

      const pokemon = await pokemonsRepositories.findOne({ id });

      if (pokemon.trainer_id !== trainer_id) {
        return response.status(401).json({ message: 'Você não possui autorização para isso!' });
      }

      await pokemonsRepositories.delete(id);

      return response.send();
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { ExcludePokemonController };
