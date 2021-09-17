/* eslint-disable camelcase */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Pokemon } from '../entities/Pokemon';

@EntityRepository(Pokemon)
class PokemonsRepositories extends Repository<Pokemon> {
  private repository: Repository<Pokemon>;

  constructor() {
    super();
    this.repository = getRepository(Pokemon);
  }

  async findPokemonByTrainerId(trainer_id: string, poke_id: number): Promise<Pokemon> {
    const pokemon = await this.repository.findOne({ trainer_id, poke_id });
    return pokemon;
  }
}

export { PokemonsRepositories };
