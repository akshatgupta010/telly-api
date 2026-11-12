export async function up(knex) {
  await knex.schema.createTable('shows', (t) => {
    t.increments('id');
    t.string('name').notNullable().unique();
    t.string('channel').notNullable();
    t.string('genre').notNullable();
    t.integer('rating').notNullable();
    t.boolean('explicit').notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable('shows');
}