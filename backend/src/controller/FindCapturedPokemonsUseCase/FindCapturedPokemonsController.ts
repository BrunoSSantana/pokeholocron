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
    const repository = getRepository(Pokemon);
    try {
      const { trainer } = request.body;

      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const findpoke =  await pokemonsRepositories
      .createQueryBuilder("pokemons")
      .where('pokemons.trainer_id = :trainer', { trainer })


      console.log('aaquii: ',findpoke)


      return response.json(findpoke);
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${error.message}`,
      });
    }
  }
}

export { FindCapturedPokemonsController };
