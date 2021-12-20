import 'dotenv/config';
import express from 'express';
import IORedis from 'ioredis';
import passport from 'passport';
import { connect, connection } from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectRedis from 'connect-redis';

import { isAuthenticated } from './config/passport';
import { AuthController, UserController } from './controllers';

const { PORT, DB_AUTH_SRC, DB_URL, DB_USER, DB_PASS } = process.env;

const app = express();
const redis = new IORedis();
const redisStore = connectRedis(session);

const main = async () => {
  // Database setup
  await connect(DB_URL, {
    authSource: DB_AUTH_SRC,
    user: DB_USER,
    pass: DB_PASS
  });
  // await connection.db.dropDatabase();

  // Express middleware setup
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      store: new redisStore({
        client: redis,
        disableTouch: true
      }),
      secret: 'yes',
      saveUninitialized: false,
      resave: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Public Routes
  app.use('/auth', AuthController);

  // Protected routes
  app.use('/user', isAuthenticated, UserController);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((error) => console.log(error));
