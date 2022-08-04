import { Controller, Delete, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { UserRoleEnum } from "./enums/user.role.enum";
import { RolesGuard } from "./guards/role.guard";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getUsers(@Query() filterDto: GetUsersFilterDto):Promise<User[]>{ 
        if(Object.keys(filterDto).length){
           return await this.userService.getUsersWithFilter(filterDto)
        }else{
            return  await this.userService.getAllUsers();
        }
    }

    @Get(':id')
    async getUser(@Param('id') id:string){
        return this.userService.getUser(id);
    }

    @Patch('/deactivate/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRoleEnum.ADMIN)
    async deactivateUser(@Param('id') id:string):Promise<User>{
        return await this.userService.deactivateUser(id);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:string){
        this.userService.deleteUser(id)
    }
}