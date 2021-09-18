/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class ExcludePokemonController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { poke_id } = request.body;

      const { trainer_id } = request;

      const pokemon = await pokemonsRepositories.findOne({ where: { trainer_id, poke_id } });

      if (pokemon.trainer_id !== trainer_id) {
        return response.status(401).json({ message: 'Você não possui autorização para isso!' });
      }

      await pokemonsRepositories.delete(pokemon.id);

      return response.status(200).json({ message: `${pokemon.name} exluído com sucesso!` });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { ExcludePokemonController };
