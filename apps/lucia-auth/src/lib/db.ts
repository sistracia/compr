// db.js
import postgres, { PostgresError } from "postgres";

export function isPostgresError(err: unknown): err is PostgresError {
  return err instanceof Error && err.name === "PostgresError";
}

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sql = postgres({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  pass: DB_PASSWORD,
});

export default sql;
