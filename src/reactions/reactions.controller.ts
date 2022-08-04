import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { AddReactionDto } from './dto/add-reaction.dto';
import { Reaction } from './reactions.model';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
@UseGuards(AuthGuard)
export class ReactionsController {
    constructor(private readonly reactionsService: ReactionsService){}

    @Post()
    async addReaction(
        @Body() addReactionDto: AddReactionDto, 
        @GetUser() auth:AuthDTO
    ):Promise<Reaction>{
        return await this.reactionsService.addReaction(addReactionDto, auth);
    }

    @Delete()
    async deleteReaction(
        @Body() addReactionDto: AddReactionDto, 
        @GetUser() auth:AuthDTO
    ){
        return await this.reactionsService.deleteReaction(addReactionDto, auth)
    }
}
