/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository, getManager } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

class FillterPokemonsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { type, poke_id, name } = request.body;
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const query = pokemonsRepositories.createQueryBuilder('pokemons');

      if (type) {
        const entityManager = getManager();
        const Newquery = entityManager.query(`SELECT * FROM pokemons WHERE types @> ARRAY['${type}']::varchar[]`);
        const pokeFilter = await Newquery;
        return response.json(pokeFilter);
      }

      if (poke_id) {
        query.where('pokemons.poke_id = :poke_id', { poke_id });
      }

      if (name) {
        query.where('pokemons.name = :name', { name });
      }

      const pokeFilter = await query.getOne();

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
