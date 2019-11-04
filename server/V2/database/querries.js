const users = `
CREATE TABLE IF NOT EXISTS users (
id serial PRIMARY KEY UNIQUE,
firstName TEXT NOT NULL,
lastName TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
)`;

export default { users };
