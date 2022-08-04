import { IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import { UserRoleEnum } from "../enums/user.role.enum";
import { UserStatusEnum } from "../enums/user.status.enum";

export class CreateUserDto{
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(8, {message: 'Password must containt at least 8 characters.'})
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsEnum(UserRoleEnum, { message: 'User role can be admin or standard user.'})
    readonly role: UserRoleEnum;

    //@IsNotEmpty()
    //@IsEnum(UserStatusEnum, {message: 'User status can be active or inactive only.'})
    readonly status: UserStatusEnum;

    readonly registeredAt: Date;

    readonly dateOfBirth: Date;
}