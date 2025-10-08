import { Post } from './post.enitty';
import { PostModel } from './post.model';
import { CreatePostDTO } from './types/dto';

class PostRepository {
    async createPost(post: CreatePostDTO):Promise<Post> {
      
        const createdPost=await PostModel.create(post);
        //pop check authorId  if it's on user model
        return createdPost.populate('authorId');
    }
    async getPostById(id: string):Promise<Post | null> {

        return PostModel.findById(id).populate('authorId');
    }


    async getAllPosts(page: number, limit: number) {
        const posts=await PostModel.find().
            skip((page - 1) * limit).
            limit(limit).
            populate('authorId')
            const postsCount=await PostModel.countDocuments();
            return {posts,postsCount};

    }
    async updatePosts(id: string, post: Partial<Post>):Promise<Post | null>   {
        return PostModel.findByIdAndUpdate(id, post, { new: true });
    }           
    async deletePost(id: string):Promise<Post | null>  {
        return PostModel.findByIdAndDelete(id);
    }   


}
export const postRepository = new PostRepository();