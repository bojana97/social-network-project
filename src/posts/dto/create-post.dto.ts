import { IsNotEmpty } from "class-validator";
import { PostReachableByEnum } from "../enums/post.reachable-by.enum";
import { PostTypeEnum } from "../enums/post.type.enum";

export class CreatePostDto{
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly location: string;

    readonly reachableBy: PostReachableByEnum;

    readonly type: PostTypeEnum;

    userId: number
}