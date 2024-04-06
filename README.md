# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Setup Database

### Create Database

This project using Postgres SQL

1. Connect to the default postgres database as the server's root user `psql -U postgres`
2. Create user `CREATE USER admin WITH PASSWORD '123456';`
3. Create database for dev and test

   1. `CREATE DATABASE storefront;`
   2. `CREATE DATABASE storefront_test;`

4. Change the owner of a database to role.
   1. `ALTER DATABASE storefront OWNER TO admin;`
   2. `ALTER DATABASE storefront_test OWNER TO admin;`

### Migrate Database

You need to install db-migrate: `npm install -g db-migrate`
After install db-migrate, run `db-migrate up` to migrate database

## .env Environment

Add a `.env` file in the root directory and set the missing `###` environment parameters

```
PORT=127.0.0.1
POSTGRES_HOST="localhost"
POSTGRES_USER=###
POSTGRES_PASSWORD=###
POSTGRES_DB="storefront"
POSTGRES_TEST_DB="storefront_test"
TOKEN_KEY=###
ENV=dev
BCRYPT_PASSWORD=###
SALT_ROUNDS="10"
```

## Steps to Completion

`yarn install`

## API Endpoints

[API Documentation](./API-DOCUMENTATION.md)

## Scripts

- Start project: `yarn start`
- Test: `yarn run test`
