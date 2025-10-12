import { ClientSession } from 'mongoose';
import { mongooseConnection } from '../../services/mongoose.service';
import { CustomError } from '../../utils/exception';
import { userMongoRepository } from '../user/user.mongorepository';
import { Post } from    './post.enitty';
import { postRepository } from './post.repository';
import { CreatePostDTO } from './types/dto';

import { PostModel } from './post.model';
class PostService {
  constructor(
    private postRepo = postRepository,
    private userRepo=userMongoRepository
  ) {}

     createPost = async (post: CreatePostDTO) => {
    const createdPost = await mongooseConnection.transaction(
      async (session) => {
        const createdPost = await this.postRepo.createPost(post, session);
        await this.userRepo.incrementPostCount(
          post.authorId as string,
          'increment',
          session
        );
        return createdPost;
      }
    );

    return createdPost;
  };

  getPostById = async (id: string) => {
    return this.postRepo.getPostById(id);
  };

  getAllPosts=async (page: number = 1, limit: number = 10)=> {
   return this.postRepo.getAllPosts(page, limit);

    
  }

  updatePost=async (id: string, postData: Partial<Post>): Promise<Post | null>=> {
      const updatedPost = await postRepository.updatePosts(id, postData);
      return updatedPost;
    
  }

  
  deletePost = async (id: string) => {
    await mongooseConnection.transaction(async (session) => {
      const deletedPost = await this.postRepo.deletePost(id, session);
      if (!deletedPost) throw new CustomError('Post not found', 'POST', 404);
      await this.userRepo.incrementPostCount(
        deletedPost.authorId as string,
        'decrement',
        session
      );
    });
  };
    
  };




export type PostServiceType = PostService;

export const postService = new PostService();