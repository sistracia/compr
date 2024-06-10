// db.js
import postgres from "postgres";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sql = postgres({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  pass: DB_PASSWORD,
});

export default sql;
