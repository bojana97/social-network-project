import { IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import { UserRoleEnum } from "../enums/user.role.enum";
import { UserStatusEnum } from "../enums/user.status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly firstName: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly lastName: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    readonly username: string;

    @IsNotEmpty()
    @MinLength(8, {message: 'Password must containt at least 8 characters.'})
    @ApiProperty({type: String})
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type: String})
    readonly email:string;

    @IsEnum(UserRoleEnum, { message: 'User role can be admin or standard user.'})
    @ApiProperty({enum: UserRoleEnum, example:UserRoleEnum.USER})
    readonly role: UserRoleEnum;

    @IsNotEmpty()
    @ApiProperty({enum: UserStatusEnum})
    readonly status: UserStatusEnum;

    readonly registeredAt: Date;

    @ApiProperty({type: String, example: '1997-02-07'})
    readonly dateOfBirth: Date;
}