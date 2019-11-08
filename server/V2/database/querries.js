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

const fetchEntries = `
SELECT * FROM entries WHERE userid = $1 ORDER BY createdon DESC `;

const deleteEntry = `
DELETE FROM entries WHERE userid = $1 AND entryid = $2 `;

const updateEntry = `
UPDATE  entries SET title = $1 , description = $2 ,  editedOn = $5 WHERE userid = $3 AND entryid = $4 RETURNING * `;

const searchTitle = `
SELECT * FROM entries WHERE title = $1 AND userid = $2 `;

const entryCreation = ` 
    INSERT INTO entries(entryId, title, description, userId, createdOn)
    VALUES($1, $2, $3, $4, $5)  
    returning entryId,title, description, createdOn
    `;
const query = `
        INSERT INTO users(id, firstName, lastName, email, password)
        VALUES($1, $2, $3, $4, $5)
        returning id, firstName, lastName, email `;

const searchEntryInDb = ` 
        SELECT * FROM entries WHERE userid = $1 AND entryid = $2 `;

export default {
  users,
  entries,
  fetchEntries,
  deleteEntry,
  updateEntry,
  searchTitle,
  entryCreation,
  query,
  searchEntryInDb

};
