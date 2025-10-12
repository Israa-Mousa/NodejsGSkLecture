import { ObjectId, SchemaDefinitionProperty } from 'mongoose';
import { User } from '../user/user.entity';

export type Post = {
  id: string;
  content: string;
  title: string;
//   authorId:ObjectId | User;
  authorId:SchemaDefinitionProperty<ObjectId> | User;

  createdAt: Date;
  updatedAt: Date;
};