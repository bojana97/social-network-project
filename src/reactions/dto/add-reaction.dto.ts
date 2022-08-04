import { IsEnum, IsNotEmpty } from "class-validator";
import { ReactionTypeEnum } from "../enums/reaction.type.enum";

export class AddReactionDto{
    @IsNotEmpty()
    @IsEnum(ReactionTypeEnum, { message: 'Reaction on post can be upvote or downvote only.'})
    type: ReactionTypeEnum;

    userId: string;

    @IsNotEmpty()
    postId: string;
}