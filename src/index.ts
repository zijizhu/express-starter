import 'reflect-metadata';
import { UserController } from './controllers';
import express from 'express';

const app = express();

const main = async () => {
  app.use(express.json());
  app.use('/user', UserController);
  app.listen(3000, () => {
    console.log('server is listening port 3000');
  });
};

main();
