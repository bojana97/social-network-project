import { UserRoleEnum } from "../enums/user.role.enum";
import { UserStatusEnum } from "../enums/user.status.enum";

export class GetUsersFilterDto{
    status: UserStatusEnum;
    type: UserRoleEnum;
}