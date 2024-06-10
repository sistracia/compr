CREATE TABLE content (
    slug varchar(25) PRIMARY KEY,
    subtitle text,
    title text,
    content jsonb
)