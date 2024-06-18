export default async function (sql) {
  await sql`
CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    github_id INTEGER NULL UNIQUE,
    github_username TEXT NULL DEFAULT '',
    username TEXT NULL UNIQUE,
    password TEXT NULL DEFAULT ''
);
    `;

  await sql`
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES "user"(id)
);
    `;
}
