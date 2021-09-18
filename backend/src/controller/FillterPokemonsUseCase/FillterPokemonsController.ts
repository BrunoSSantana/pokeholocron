/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class FillterPokemonsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { type, poke_id, name } = request.body;
      const { trainer_id } = request;

      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);
      const query = pokemonsRepositories
        .createQueryBuilder('pokemons')
        .where('pokemons.trainer_id = :trainer_id', { trainer_id });

      if (type) {
        query.andWhere('types @> ARRAY[:type]::varchar[]', { type });
      }

      if (poke_id) {
        query.andWhere('pokemons.poke_id = :poke_id', { poke_id });
      }

      if (name.trim() !== '') {
        query.andWhere('pokemons.name = :name', { name });
      }

      const pokeFilter = await query.getMany();

      return response.json(pokeFilter);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { FillterPokemonsController };
