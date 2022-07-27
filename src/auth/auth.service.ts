import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginFailedErr } from './error';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    public async signUp(createUserDto) {
        return this.userService.create(createUserDto);
    }

    
    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        console.log(user);        
        
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }


    public async login(payload: { username: string, password: string }) {
        // check if user exist
        const user = await this.userService.findOneByUsername(payload.username);
        // user not exist [return bad reuest]
        if (!user) {
            return new BadRequestException(LoginFailedErr)
        }

        // user exist [check if password is valid]
        const match = await this.comparePassword(payload.password, user.password);
        // if password is invalid return bad request
        if (!match) {
            return new BadRequestException(LoginFailedErr)
        }

        // if password valid create jwt token
        const token = await this.generateToken({sub: user.id, username: user.username, role: user.role});
        
        // return jwt
        return { token };
    }

    public async create(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

}
