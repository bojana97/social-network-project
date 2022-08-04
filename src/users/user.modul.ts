import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    providers: [
        UserService, 
        ...UsersRepository
    ],
    exports: [UserService ],
    controllers: [UsersController]
})

export class UsersModule{}