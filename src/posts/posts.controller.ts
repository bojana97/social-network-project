import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import {ApiTags,ApiOkResponse,ApiNotFoundResponse, ApiBody, ApiCreatedResponse as ACR, ApiUnauthorizedResponse,ApiParam, ApiBearerAuth} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './post.model';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService){}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    @ACR({description: 'Post created'})
    @ApiBody({type:CreatePostDto})
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
    @ApiOkResponse({ description: 'Post returned successfully' })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiParam({name: 'id', required: true, type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    async getPost(@Param('id') id:string){
        return this.postService.getPost(id)
    }


    @Patch(":id")
    @ApiOkResponse({ description: 'Post updated successfully' })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiParam({name: 'id', required: true, type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    @ApiBody({type: UpdatePostDto})
    async updatePost(@Param('id') id:string, @Body() updatePostDto: UpdatePostDto, @GetUser() user:AuthDTO){
        return this.postService.updatePost(id, updatePostDto, user);
    }
    
}

