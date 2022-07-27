import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { User } from "src/users/user.model";
import { UserService } from "src/users/user.service";
import { JwtPayload } from "./jwt-payload.interface";
import { UsersRepository } from "src/users/user.repository";
import { UserRoleEnum } from "src/users/enums/user.role.enum";
import { UserStatusEnum } from "src/users/enums/user.status.enum";
import { UserDeactivated } from "./error";
import { AuthDTO } from "./dto/auth.dto";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //??????
            secretOrKey: 'topSecret51',
        })
    }

    /*
    async validate(payload: any):Promise<User> {
        // check if user in the token actually exist
        // const user = await this.userService.findOneById(payload.id);
        // if (!user) {
        //     throw new UnauthorizedException('You are not authorized to perform the operation');
        // }
        // return payload;
       //console.log(payload)
       const { id } = payload;
       //const user = await this.userService.findOneByUsername(username);
        const user = await this.userService.findOneById(id)

      /*  const user =  {
            id: 24,
            firstName: "firstname",
            lastName: "lastname",
            username: username,
            password: "$2b$10$MGJQAIP0m7.ZisbSKRCGE.2oj8CwSm9jDw.TU0nFRECjmwEwOMsqe",
            email: "ok@gmail.com",
            createdAt: "2022-07-22T10:13:04.477Z",
            updatedAt: "2022-07-22T10:13:04.477Z"
        }
        
        //console.log(user);
        //const user:User = await this.userService.findOneByUsername(username)
        if (!user) {
           throw new UnauthorizedException();
        }
    
        return user;
    }*/

    async validate(payload: { sub: number, username: string, role: string, status: string, iat: number, exp: number }): Promise<AuthDTO> {
        return { userId: payload.sub, username: payload.username, role: payload.role }
    }
}