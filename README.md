# Express Starter

This repository is a working express.js server for quickly scaffolding the backend of my future projects. It provides a basic folder structure and takes care of (session based) user authentication. It is opinionated and may not suit some usecases.

## Features

- TypeScript
- PostgreSQL with Prisma ORM
- Session authentication with express-sesssion and passport.js
- Redis store for persisting session data

## Get Started

### Pre-reqs

1. [Node.js](https://nodejs.org/en/)
2. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
3. [PostgreSQL](https://www.postgresql.org/download/)
4. [Redis](https://redis.io/topics/quickstart)

### Development

First, create a .env file to let node access environment variables

```shell
# Only needed for development
touch .env
```

Then, add environment variables to .env
For `DATABASE_URL`, see [this Prisma guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres)

```
PORT=<port-number>
SESSION_SECRET=<your-session-secret>
REDIS_URL=<redis-server-url>
DATABASE_URL=<postgresql-server-url>
```

Make sure both PostgreSQL and Redis are running.
Finally, install dependencies and start the server

```shell
# Install dependencies
yarn install

# Compile TypeScript source code into JavsScript and watch for changes
yarn watch

# Open a new terminal, start developing
yarn dev
```

### Deployment

This server is able to run on Heroku (free tier) via docker
To deploy on Heroku, please make sure:

1. You have [Docker](https://docs.docker.com/get-docker/) installed.
2. You have a Heroku account and have [Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli) installed.

Then please follow [this Heroku Guide](https://devcenter.heroku.com/articles/container-registry-and-runtime). After creating the app by `heroku create`, you need to install Heroku PostgreSQL and Redis addons for the app to work properly:

- [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql)
- [Heroku Redis](https://devcenter.heroku.com/articles/heroku-redis)

### Testing

There aren't any tests yet. However, [Jest](https://jestjs.io/docs/getting-started) should work great with this project.
