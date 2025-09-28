import { faker } from '@faker-js/faker';
import { PrismaClient, Prisma,Post } from '../src/generated/prisma';

export function createRandomPost() {
  const randomPost: Omit<Post, 'authorId' | 'id'> = {
    title: faker.lorem.sentence(),
    content: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime()
  };
  return randomPost;
}