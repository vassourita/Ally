import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('report', table => {
    table.increments('id').primary().notNullable();
    table.text('description').notNullable();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE');
    table
      .integer('job_vacancy_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('job_vacancy')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('report');
}
