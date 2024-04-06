CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    username VARCHAR(255),
    password_digest VARCHAR(255)
);