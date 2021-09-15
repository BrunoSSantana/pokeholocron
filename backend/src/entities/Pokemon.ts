/* eslint-disable camelcase */
import {
  Entity, Column, PrimaryColumn, CreateDateColumn,
} from 'typeorm';

@Entity('pokemons')
class Pokemon {
  @PrimaryColumn()
  id: string;

  @Column()
  poke_id: number;

  @Column()
  trainer_id: string;

  @Column()
  name: string;

  @Column('text', { array: true })
  types: string[];

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column('text', { array: true })
  abilities: string[];

  @CreateDateColumn()
  created_at: Date;
}
export { Pokemon };
