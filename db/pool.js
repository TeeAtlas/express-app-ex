import pg from 'pg';


//uses destructuring to pull out the pool object from the pg package
const { Pool } = pg;

// if you leave pool params empty  .env autopolulates the pool object
export const pool = new Pool();