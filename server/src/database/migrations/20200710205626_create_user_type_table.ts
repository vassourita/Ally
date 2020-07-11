import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_type', table => {
    table.integer('id').unsigned().primary().notNullable();
    table.string('name', 24).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user_type');
}
