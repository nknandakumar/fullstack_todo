import pkg from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const pgp = pkg();
const db = pgp({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME
});

export default db;
