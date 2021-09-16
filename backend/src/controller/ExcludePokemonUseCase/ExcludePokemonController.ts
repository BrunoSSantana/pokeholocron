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
      // trazer id do usuário pelo token

      // busca o pokemon

      // if pokemon.trainer_id !== id no token => Não é possível excluir esse pokémon

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
