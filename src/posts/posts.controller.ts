import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
    constructor(private readonly postService: PostsService){}

    @Post()
    async createPost(@Body() createPostDto:CreatePostDto, @GetUser() auth: AuthDTO):Promise<PostModel>{
        createPostDto.userId = auth.userId
        const post = await this.postService.createPost(createPostDto);
        return post;
    }
    
}
