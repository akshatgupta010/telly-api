export async function seed(knex) {
    await knex.raw('TRUNCATE TABLE shows RESTART IDENTITY');
    await knex('shows').insert([
        { name: 'Suits', channel: 'USA Network', genre: 'Drama', rating: 3, explicit: false },
        { name: 'Game of Thrones', channel: 'HBO', genre: 'Fantasy', rating: 5, explicit: true },
        { name: 'South Park', channel: 'Comedy Central', genre: 'Comedy', rating: 4, explicit: true },
        { name: 'Mad Men', channel: 'AMC', genre: 'Drama', rating: 3, explicit: false },
    ]);
}