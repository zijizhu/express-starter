# Express Starter

This repository is a working express.js server for quickly scaffolding the backend of my future projects. It provides a basic folder structure and takes care of (session based) user authentication. It is opinionated and may not suit some usecases.

## Features

- TypeScript
- Mongodb with Mongoose
- Session authentication with express-sesssion and passport.js
- Redis store for persisting session data

## Get Started

### Pre-reqs

1. [Node.js](https://nodejs.org/en/)
2. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
3. [Mongodb](https://docs.mongodb.com/manual/installation/)
4. [Redis](https://redis.io/topics/quickstart)

### Development

First, create a .env file to let node access environment variables

```shell
touch .env
```

Adding environment variables to .env

```
PORT=4000
```

Make sure both Mongodb and Redis are running.
Then, install the project and start the server

```shell
# Install the project
yarn install

# Compile TypeScript source code into JavsScript and watch for changes
yarn watch

# Open a new terminal, start developing
yarn dev
```

### Deployment

## Improvements

### Testing
