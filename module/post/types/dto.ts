import { Post } from  '../post.enitty'

export type CreatePostDTO = Pick<Post, 'title' | 'content' | 'authorId'>;