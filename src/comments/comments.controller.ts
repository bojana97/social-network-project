import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {ApiTags,ApiParam,ApiNotFoundResponse ,ApiOkResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @Post()
    @ApiBody({type:CreateCommentDto})
    @ApiCreatedResponse({ description: 'Comment added succesfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized request' })
    async create(@Body() createCommentDto: CreateCommentDto, @GetUser() user:AuthDTO){
       return await this.commentsService.createComment(createCommentDto, user);
    }

    @Patch()
    @ApiBody({type: CreateCommentDto})
    @ApiOkResponse({ description: 'The comment was updated successfully' })
    @ApiNotFoundResponse({ description: 'Comment not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    async update(@Body() createCommentDto: CreateCommentDto, @GetUser() user:AuthDTO){
       return await this.commentsService.updateComment(createCommentDto, user);
    }

    @Delete(':id')
    @ApiParam({name:'id', example: 1})
    @ApiOkResponse({ description: 'Comment deleted successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Comment not found' })
    async delete(@Param() {id}, @GetUser() user:AuthDTO){
        return await this.commentsService.deleteComment(id, user)
    }

}
