/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PokemonsRepositories } from '../../repositories/PokemonsRepositories';

interface IAddPokemonRequest {
  poke_id: number,
  name: string,
  types: string[],
  image: string,
  weight: number,
  height: number,
  attack: number,
  defense: number,
  abilities: string[],
}

class AddPokemonControler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pokemonsRepositories = getCustomRepository(PokemonsRepositories);

      const { trainer_id } = request;

      const {
        poke_id,
        name,
        types,
        image,
        weight,
        height,
        attack,
        defense,
        abilities,
      }: IAddPokemonRequest = request.body;

      if (name.trim() === '' || image.trim() === '' || trainer_id.trim() === '') {
        return response.status(401).json({ message: 'Dados incompletos!' });
      }

      const pokemonExist = await pokemonsRepositories.findPokemonByTrainerId(trainer_id, poke_id);

      if (pokemonExist) {
        return response.status(401).json({ message: `${name} já adicionado` });
      }

      const pokemon = pokemonsRepositories.create({
        trainer_id,
        poke_id,
        name,
        types,
        image,
        weight,
        height,
        attack,
        defense,
        abilities,
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
