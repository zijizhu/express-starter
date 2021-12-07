import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class Post extends BaseEntity {
  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  likes = 0;

  @OneToMany(() => User, (user) => user)
  likedUsers = new Collection<User>(this);

  constructor(title: string, content: string) {
    super();
    this.title = title;
    this.content = content;
  }
}
