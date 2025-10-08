// schema

import mongoose, { model, Schema, Types } from 'mongoose';
import { Post } from './post.enitty';
import { schemaToJsonDefaultOption } from '../../services/mongoose.service';

const postSchema = new  mongoose.Schema<Post>(
  {
    content: { type: 'String', required: true },
    title: { type: 'String', required: true },
    authorId: { type:'ObjectId', ref:'User',required: true } },
  { timestamps: true,versionKey:false
    ,toJSON:schemaToJsonDefaultOption
  }
  
);

export const PostModel = model<Post>('Post', postSchema);