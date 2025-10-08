// schema

import { dmmfToRuntimeDataModel } from '@prisma/client/runtime/client';
import mongoose, { model, Schema, Types } from 'mongoose';
type Post={
    content: string;
    title: string;
    user_id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
const postSchema = new  mongoose.Schema<Post>(
  {
    content: { type: 'String', required: true },
    title: { type: 'String', required: true },
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
  },
  { timestamps: true }
);

export const PostModel = model<Post>('Post', postSchema);