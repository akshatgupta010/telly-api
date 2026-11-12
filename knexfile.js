import  'dotenv/config';

const base = {
    client: 'pg',
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
};

export default {
    development: { ...base, connection: process.env.DATABASE_URL },
    test: { ...base, connection: process.env.TEST_DATABASE_URL },
    production: {  ...base, connection: process.env.DATABASE_URL },
};

