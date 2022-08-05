import { IsEnum, IsNotEmpty } from "class-validator";
import { ReactionTypeEnum } from "../enums/reaction.type.enum";
import {ApiProperty} from "@nestjs/swagger";
import { Reaction } from "../reactions.model";

export class AddReactionDto{
    @IsNotEmpty()
    @IsEnum(ReactionTypeEnum, { message: 'Reaction on post can be upvote or downvote only.'})
    @ApiProperty({enum: ReactionTypeEnum, example:ReactionTypeEnum.UPVOTE})
    type: ReactionTypeEnum;

    userId: string;

    @IsNotEmpty()
    @ApiProperty({type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    postId: string;
}