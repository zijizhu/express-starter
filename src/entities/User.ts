import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
  username: string;

  @Property({ nullable: true })
  dob?: Date;

  @Property()
  email: string;

  constructor(username: string, email: string) {
    super();
    this.username = username;
    this.email = email;
  }
}
