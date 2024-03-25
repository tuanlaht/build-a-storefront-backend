CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    userName VARCHAR(255),
    password_digest VARCHAR(255)
);