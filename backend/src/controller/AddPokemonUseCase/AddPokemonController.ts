/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class AddPokemonControler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);
      const {
        poke_id, name, types, image, weight, height, attack, defense, abilities, trainer_id,
      } = request.body;

      const pokemon = pokemonsRepositories.create({
        poke_id, name, types, image, weight, height, attack, defense, abilities, trainer_id,
      });

      await pokemonsRepositories.save(pokemon);

      return response.json(pokemon);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { AddPokemonControler };
