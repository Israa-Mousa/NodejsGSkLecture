import zod, { ZodType } from 'zod';
import { Post } from '../post.enitty';
import { mongoObjectIdSchema } from '../../../utils/zod.utill';

export const postSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  content: zod.string().min(1, 'Content is required'),
  authorId: mongoObjectIdSchema,
}) satisfies ZodType<Pick<Post, 'title' | 'content' | 'authorId'>>;