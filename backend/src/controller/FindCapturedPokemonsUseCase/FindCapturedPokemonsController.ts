/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';
import {Pokemon} from "../../entities/Pokemon";
import { getRepository } from 'typeorm'
import {getConnection} from "typeorm";

class FindCapturedPokemonsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {

      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { trainer_id } = request;
      

      if (!trainer_id) {
        return response.status(401).json({ message: 'usuário não Autenticado' });
      }

      const pokemons = await pokemonsRepositories.find({ trainer_id });

      const pokemonsOrderByName = pokemons.sort((a, b) => (
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      ));

      return response.json(pokemonsOrderByName);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { FindCapturedPokemonsController };
