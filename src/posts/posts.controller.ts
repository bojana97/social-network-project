import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { create } from 'domain';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';

@Controller('posts')

export class PostsController {
    constructor(private readonly postService: PostsService){}

    @Post()
    @UseGuards(AuthGuard())
    async createPost(@Body() createPostDto:CreatePostDto, @GetUser() auth:AuthDTO):Promise<PostModel>{
        createPostDto.userId = auth.userId;
        const post = await this.postService.createPost(createPostDto);
        return post;
    }

    @Get()
    async getPosts(){
        return this.postService.findAll();
    }

    @Get(":id")
    async getPost(@Param('id') id:number){
        return this.postService.getPost(id)
    }
    
}
