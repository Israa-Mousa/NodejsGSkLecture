// import { mongo } from "mongoose";

import { ObjectId } from "mongoose";

export interface User {
  id: ObjectId;
  name: string;
  email: string;
  avatar: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  password: string; // hash value
 // posts:mongo.ObjectId[];
}


// import { User as PrismaUser } from '../../src/generated/prisma';

// export type User = PrismaUser;