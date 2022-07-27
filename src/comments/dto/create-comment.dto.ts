export class CreateCommentDto{
    readonly comment: string;
    postId: number;
    userId: number;
}