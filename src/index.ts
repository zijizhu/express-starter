import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import PromiseRouter from 'express-promise-router';
// import { User } from './entities';
import express from 'express';
import options from './mikro-orm.config';

const app = express();
const router = PromiseRouter();

router.post('/:name/:email', async (req, res) => {
  if (!req.query.name || !req.params.name) {
    console.log(req.body);
    return res.status(400).json({ message: 'One of `name, email` is missing' });
  }
  return res.json({ message: 'hi' });
});

const main = async () => {
  const orm = await MikroORM.init(options);
  console.log(orm.em);
  app.use(express.json());
  app.use('/user', router);
  app.listen(3000, () => {
    console.log('server is listening port 3000');
  });
};

main();
