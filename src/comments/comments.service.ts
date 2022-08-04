import { Body, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.model';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.model';

@Injectable()
export class CommentsService {

    constructor(@Inject('COMMENTS_REPOSITORY') 
        private CommentsRepository: typeof Comment,
        private postService: PostsService
    ){}

    async createComment(@Body() createCommentDto:CreateCommentDto, @GetUser() user:AuthDTO):Promise<Comment>{
        createCommentDto.userId = user.userId;
        return await this.CommentsRepository.create(createCommentDto);
    }

    async updateComment(@Body() createCommentDto:CreateCommentDto, @GetUser() user:AuthDTO):Promise<Comment>{
        await this.postService.findById(createCommentDto.postId);

        const comment = await this.CommentsRepository.findOne({
            where:{userId: user.userId, postId:createCommentDto.postId}
        })

        if(!comment){
            throw new NotFoundException('Comment could not be found.')
        }

        comment.set({comment: createCommentDto.comment})

        return comment;
    }

    async deleteComment(id:number, user:AuthDTO){

        const comment = await this.CommentsRepository.findOne({
            include:[
                {model: Post}
            ],
            where: {id:id}
        })

        if(!comment){
            throw new NotFoundException('Comment could not be found.')
        }

        if(comment.post.userId != user.userId || comment.userId != user.userId){
            throw new ForbiddenException('User is not allowed to delete comment.')
        }

        return comment.destroy()
    }
}
