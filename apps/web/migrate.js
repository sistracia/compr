import postgres from "postgres";
import shift from "postgres-shift";
import { fileURLToPath } from "url";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const sql = postgres({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  pass: DB_PASSWORD,
  idle_timeout: 1,
});

shift({
  sql,
  path: fileURLToPath(new URL("migrations", import.meta.url)),
  before: ({ migration_id, name }) => {
    console.log("Migrating", migration_id, name);
  },
})
  .then(() => console.log("All good"))
  .catch((err) => {
    console.error("Failed", err);
    process.exit(1);
  });
