/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompliments1630948076541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pokemons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'trainer_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'types',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'weight',
            type: 'numeric',
          },
          {
            name: 'height',
            type: 'numeric',
          },
          {
            name: 'attack',
            type: 'numeric',
          },
          {
            name: 'defense',
            type: 'numeric',
          },
          {
            name: 'abilities',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKTrainerPokemon',
            referencedTableName: 'trainer',
            referencedColumnNames: ['id'],
            columnNames: ['trainer_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pokemons');
  }
}
