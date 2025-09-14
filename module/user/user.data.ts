import { createRandomUser } from '../../seeds/user.seed';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';


export const userData: User[] = faker.helpers.multiple(createRandomUser, { count: 10 });