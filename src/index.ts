import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import IORedis from 'ioredis';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectRedis from 'connect-redis';

import { isAuthenticated, cookieConfig } from './config';
import { AuthController, UserController } from './controllers';

const { PORT, SESSION_SECRET, REDIS_URL } = process.env;

const app = express();
const redis = new IORedis(REDIS_URL);
const redisStore = connectRedis(session);

const main = async () => {
  // Express middleware setup
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      store: new redisStore({
        client: redis,
        disableTouch: true
      }),
      proxy: true,
      resave: false,
      cookie: cookieConfig,
      secret: SESSION_SECRET,
      saveUninitialized: false
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
