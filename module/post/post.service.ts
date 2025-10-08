import { mongooseConnection } from '../../services/mongoose.service';
import { CustomError } from '../../utils/exception';
import { Post } from    './post.enitty';
import { postRepository } from './post.repository';
import { CreatePostDTO } from './types/dto';
;

class PostService {
  constructor(
    private postRepo = postRepository,
  ) {}

    createPost=async (post:CreatePostDTO): Promise<Post>=> {    
       
        return this.postRepo.createPost(post);
    }     
    getPostById=async (id: string): Promise<Post | null> =>{

      const post = await postRepository.getPostById(id);
      return post;
    
  }

  getAllPosts=async (page: number = 1, limit: number = 10)=> {
   return this.postRepo.getAllPosts(page, limit);

    
  }

  updatePost=async (id: string, postData: Partial<Post>): Promise<Post | null>=> {
      const updatedPost = await postRepository.updatePosts(id, postData);
      return updatedPost;
    
  }

  
  deletePost=async (id: string): Promise<Post | null> =>{
    
      const deletedPost = await postRepository.deletePost(id);
      return deletedPost;
    
  }
    
  };




export type PostServiceType = PostService;

export const postService = new PostService();