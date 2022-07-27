import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./user.controller";
import { UsersRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    providers: [UserService, ...UsersRepository,   ],
    exports: [UserService ],
    controllers: [UsersController],
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })] //Check how to import passportt module-default strategy all in once. Link: https://stackoverflow.com/questions/53353623/in-nest-js-while-using-passport-module-do-we-have-to-use-passportmodule-register 
})
export class UsersModule{}