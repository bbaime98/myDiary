const users = `
CREATE TABLE IF NOT EXISTS users (
id UUID PRIMARY KEY UNIQUE,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
)`;
const entries = `
CREATE TABLE IF NOT EXISTS entries (
entryId UUID PRIMARY KEY,
userId UUID REFERENCES users (id)  ON DELETE CASCADE ON UPDATE CASCADE,
title TEXT NOT NULL,
description TEXT NOT NULL,
createdOn TEXT,
editedOn TEXT 
)`;
export default { users, entries };
