import { BadRequestException, Body, ConflictException, Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.model';
import { PostsService } from 'src/posts/posts.service';
import { create } from 'domain';

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
      //console.log(Object.values(postId)[0])
       // const postID = Object.values(postId)[0];
        //await this.postService.findById(postID);
        
     /* const comment = await this.CommentsRepository.findOne({ where: { userId: user.userId, postId: postID} });
        if (!comment) {
            throw new ConflictException('No comment found on post.')
        }*/

       // console.log(this.CommentsRepository.destroy({where: {id: id}}))

    const result = await this.CommentsRepository.destroy({
        where: {id: id, userId: user.userId}
    });

    if(result === 0){
        throw new BadRequestException('Comment could not be found');
    }

    }
}
