import { MikroORM } from '@mikro-orm/core';
import options from './mikro-orm.config';

async () => {
  const orm = await MikroORM.init(options);
  console.log(orm.em);
};
