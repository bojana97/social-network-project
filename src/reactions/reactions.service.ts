import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { PostsService } from 'src/posts/posts.service';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { AddReactionDto } from './dto/add-reaction.dto';
import { Reaction } from './reactions.model';

@Injectable()
export class ReactionsService {

    constructor(@Inject('REACTIONS_REPOSITORY')
    private ReactionsRepository: typeof Reaction,
    private postService: PostsService
    ) { }

    async addReaction(addReactionDto: AddReactionDto, @GetUser() auth: AuthDTO,): Promise<Reaction> {
        await this.postService.findById(addReactionDto.postId);// is this correct way to check if post exists at all? same od delete and update??
        
        const foundPostReaction = await this.ReactionsRepository.findOne({ 
            where: { userId: auth.userId, postId: addReactionDto.postId } 
        });

        if (!foundPostReaction) {
            addReactionDto.userId = auth.userId;
            const postReaction = this.ReactionsRepository.create(addReactionDto);
            return postReaction;
        }

        if (foundPostReaction.type == addReactionDto.type) {
            throw new ConflictException(`Post already has reaction ${foundPostReaction.type}`)
        } else {
            await this.ReactionsRepository.update({type: addReactionDto.type},{
                where: {userId: auth.userId, postId: addReactionDto.postId},
            })

            return this.ReactionsRepository.findOne({where:{id:foundPostReaction.id}})
        }
    }


    async deleteReaction(addReactionDto: AddReactionDto, @GetUser() auth: AuthDTO) {
        await this.postService.findById(addReactionDto.postId);

        const postReaction = await this.ReactionsRepository.findOne({ where: { userId: auth.userId, postId: addReactionDto.postId } });
        if (!postReaction) {
            throw new ConflictException('No action found on post.')
        }
        return postReaction.destroy();
    }

    /*
    async updateReaction(addReactionDto: AddReactionDto, @GetUser() auth: AuthDTO) {
        const foundPostReaction = await this.ReactionsRepository.findOne({ where: { userId: auth.userId, postId: addReactionDto.postId}});
        
        if (!foundPostReaction) {
            throw new ConflictException('Reaction on post does not exist.')
        }

        const postReaction = this.ReactionsRepository.create()
        postReaction.set({type: addReactionDto.type})

        return await postReaction.save();
    }*/
}