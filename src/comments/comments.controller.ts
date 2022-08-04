import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto, @GetUser() user:AuthDTO){
       return await this.commentsService.createComment(createCommentDto, user);
    }

    @Patch()
    async update(@Body() createCommentDto: CreateCommentDto, @GetUser() user:AuthDTO){
       return await this.commentsService.updateComment(createCommentDto, user);
    }

    @Delete(':id')
    async delete(@Param() {id}, @GetUser() user:AuthDTO){
        return await this.commentsService.deleteComment(id, user)
    }

}
