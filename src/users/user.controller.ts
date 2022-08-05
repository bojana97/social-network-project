import { Controller, Delete, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { UserRoleEnum } from "./enums/user.role.enum";
import { RolesGuard } from "./guards/role.guard";
import { User } from "./user.model";
import { UserService } from "./user.service";
import {ApiTags, ApiNotFoundResponse, ApiParam, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get()
    @ApiOkResponse()
    async getUsers(@Query() filterDto: GetUsersFilterDto):Promise<User[]>{ 
        if(Object.keys(filterDto).length){
           return await this.userService.getUsersWithFilter(filterDto)
        }else{
            return  await this.userService.getAllUsers();
        }
    }

    @Get(':id')
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiParam({name: 'id', required: true, type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    async getUser(@Param('id') id:string){
        return this.userService.getUser(id);
    }

    @Patch('/deactivate/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @ApiParam({name: 'id', required: true, type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    @Roles(UserRoleEnum.ADMIN)
    async deactivateUser(@Param('id') id:string):Promise<User>{
        return await this.userService.deactivateUser(id);
    }

    @Delete('/:id')
    @ApiUnauthorizedResponse({description:'Unauthorized'})
    @ApiOkResponse({description:'User deleted'})
    @ApiParam({name: 'id', required: true, type: String, example: '8e6c9e4f-0a7f-41c8-9a53-71192200c3ff'})
    async deleteUser(@Param('id') id:string){
        this.userService.deleteUser(id)
    }
}