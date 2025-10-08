import { Request, Response } from 'express';
import { postService as _postService, PostServiceType } from './post.service';
import { CreatePostDTO } from './types/dto';
import { zodValidation } from '../../utils/zod.utill';
import { postSchema } from './util/post.schema';
export class PostController {
  constructor(private postService: PostServiceType = _postService) {}

  findAll = async (
 req: Request<{}, {}, {}, { page?: string; limit?: string }>,    
  res:Response
) => {
    const { page, limit } = req.query ;
const pageQuery=Number(page)|1;
const limitQuery=Number(limit)|10;
    const {posts,postsCount}  = await this.postService.getAllPosts(pageQuery,limitQuery);
    
    //res.json(posts);
 res.paginationResponse(posts,{
        page:pageQuery, 
        limit:limitQuery,
        totalRecords:postsCount,
 }
   );
    };


//     createPost = async (req:Request <CreatePostDTO>, res: Response) => {
//     const post = req.body;
//         const newpost = await this.postService.createPost(req.body);
//     res.status(201).json(newpost); 
//   }

  create = async (
    req: Request<{}, {}, CreatePostDTO>,
    res: Express.Response
  ) => {
    const post: CreatePostDTO  = zodValidation(postSchema, req.body, 'POST');
    const newPost = await this.postService.createPost(post);
    res.create(newPost);
  };
}


export const postController = new PostController();

