import { User } from './user.entity';
import { faker } from '@faker-js/faker';

export function createndomUser(){
  const randomUser: User = {
       id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt:faker.date.past(),
       password: faker.internet.password(), 
      updatedAt: faker.date.anytime(),
      avatar: faker.image.avatar(),
  }
  return randomUser;
}

export const userData: User[] = faker.helpers.multiple(createndomUser, { count: 10 });