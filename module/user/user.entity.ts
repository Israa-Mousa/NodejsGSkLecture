import { mongo } from "mongoose";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  password: string; // hash value
  posts:mongo.ObjectId[];
}


// import { User as PrismaUser } from '../../src/generated/prisma';

// export type User = PrismaUser;