import { IsNotEmpty } from "class-validator";
import { PostReachableByEnum } from "../enums/post.reachable-by.enum";
import { PostTypeEnum } from "../enums/post.type.enum";
import {ApiProperty} from "@nestjs/swagger";
import { title } from "process";
import { ENUM } from "sequelize/types";

export class UpdatePostDto{
    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly title: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly description: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly location: string;

    @ApiProperty({enum: PostReachableByEnum, example: PostReachableByEnum.noVehicle})
    readonly reachableBy: PostReachableByEnum;

    @ApiProperty({enum: PostTypeEnum, example: PostTypeEnum.mountainPath})
    readonly type: PostTypeEnum;
}