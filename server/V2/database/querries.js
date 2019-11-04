const users = `
CREATE TABLE IF NOT EXISTS users (
id serial PRIMARY KEY UNIQUE,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
)`;
const entries = `
CREATE TABLE IF NOT EXISTS entries (
entryId serial PRIMARY KEY,
userId INTEGER REFERENCES users (id)  ON DELETE CASCADE ON UPDATE CASCADE,
title TEXT NOT NULL,
description TEXT NOT NULL,
createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
export default { users, entries };
