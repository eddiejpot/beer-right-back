/* ================================================= */
/* =============== IMPORT MODULES ================= */
/* ================================================ */

import pg from 'pg'; // npm install pg

// DB Configuration

// Initialise the DB connection
const { Pool } = pg;

// create separate DB connection configs for production vs non-production environments.
// ensure our server still works on our local machines.
let pgConnectionConfigs;

// HEROKU
// test to see if the env var is set. Then we know we are in Heroku
if (process.env.DATABASE_URL) {
  // pg will take in the entire value and use it to connect
  pgConnectionConfigs = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  // AWS
} else if (process.env.ENV === 'PRODUCTION') {
  // determine how we connect to the remote Postgres server
  pgConnectionConfigs = {
    user: 'postgres',
    // set DB_PASSWORD as an environment variable for security.
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'brb_app',
    port: 5432,
  };

// LOCAL
} else {
  // determine how we connect to the local Postgres server
  pgConnectionConfigs = {
    user: 'eddiejpot',
    host: 'localhost',
    database: 'brb_app',
    port: 5432, // Postgres server always runs on this port by default
  };
}

const pool = new Pool(pgConnectionConfigs);

/* ================================================= */
/* =============== EXPORT MODULES ================= */
/* ================================================ */

export default pool;
