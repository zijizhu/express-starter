import { Options } from '@mikro-orm/core';
import { BaseEntity, User, Post } from './entities';

export const options: Options = {
  entities: [BaseEntity, User, Post],
  dbName: 'learn-express-db',
  type: 'mongo',
  debug: true
};

export default options;
