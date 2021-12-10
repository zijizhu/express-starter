import { UserController } from './controllers';
import { connect } from 'mongoose';
import 'dotenv/config';
import express from 'express';

const { DB_AUTH_SRC, DB_URL, DB_USER, DB_PASS } = process.env;

const app = express();

const main = async () => {
  await connect(DB_URL, {
    authSource: DB_AUTH_SRC,
    user: DB_USER,
    pass: DB_PASS
  });
  app.use(express.json());
  app.use('/user', UserController);
  app.listen(3000, () => {
    console.log('server is listening port 3000');
  });
};

main();
