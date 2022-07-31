import { Controller, Get, Inject, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./decorators/get-user.decorator";
import { Roles } from "./decorators/roles.decorator";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { UserRoleEnum } from "./enums/user.role.enum";
import { RolesGuard } from "./guards/role.guard";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getUsers(@Query() filterDto: GetUsersFilterDto):Promise<User[]>{ //does it make difference if Promise:<User[]> is used?
        if(Object.keys(filterDto).length){
           return await this.userService.getUsersWithFilter(filterDto)
        }else{
            return  await this.userService.getAllUsers();
        }
        //SELECT "id", "firstName", "lastName", "username", "password", "email", "dateOfBirth", "role", "status", "createdAt", "updatedAt" FROM "Users" AS "User" ORDER BY "User"."createdAt" DESC;
    }

    @Get(':id')
    async getUser(@Param('id') id:number){
        return this.userService.getUser(id);
    }

    @Patch('/deactivate/:id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
    async deactivateUser(@Param('id') id:number):Promise<User>{
        console.log(id, '-> user deactivated')
        return await this.userService.deactivateUser(id);
    }
}