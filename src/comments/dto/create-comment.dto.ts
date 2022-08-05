import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto{
    @ApiProperty({type:String})
    readonly comment: string;

    @ApiProperty({type:String})
    postId: string;
    userId: string;
}