import { EntityRepository, Repository } from 'typeorm';
import { Pokemon } from '../entities/Pokemon';

@EntityRepository(Pokemon)
class PokemonsRepositories extends Repository<Pokemon> {}

export { PokemonsRepositories };
