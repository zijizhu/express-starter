import 'dotenv/config';
import express from 'express';
import { connect, connection } from 'mongoose';

import { AuthController, UserController } from './controllers';

const { PORT, DB_AUTH_SRC, DB_URL, DB_USER, DB_PASS } = process.env;

const app = express();

const main = async () => {
  await connect(DB_URL, {
    authSource: DB_AUTH_SRC,
    user: DB_USER,
    pass: DB_PASS
  });
  // await connection.db.dropDatabase();
  app.use(express.json());
  app.use('/auth', AuthController);
  app.use('/user', UserController);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((error) => console.log(error));
