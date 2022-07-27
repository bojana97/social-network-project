import { Inject, Injectable } from "@nestjs/common";
import { AuthDTO } from "src/auth/dto/auth.dto";
import { User } from "src/users/user.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./post.model";

@Injectable()
export class PostsService{
   constructor(@Inject('POSTS_REPOSITORY') private PostsRepository: typeof Post){}
    
   async createPost(createPostDto:CreatePostDto):Promise<Post>{
        return this.PostsRepository.create(createPostDto);
   }

}