import { UserRoleEnum } from "../enums/user.role.enum";
import { UserStatusEnum } from "../enums/user.status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class GetUsersFilterDto{
    @ApiProperty({enum: UserStatusEnum})
    status: UserStatusEnum;

    @ApiProperty({enum: UserRoleEnum})
    type: UserRoleEnum;
}