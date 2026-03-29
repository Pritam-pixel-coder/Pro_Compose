const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smartprompt",
  password: "798522",
  port: 5432,
});

module.exports = pool;