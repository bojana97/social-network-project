import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginFailedErr } from './error';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

    
    private async generateToken(user, options?) {
        const token = await this.jwtService.signAsync(user, options);
        
        return token;
    }

    public async decodeToken(token){
        return this.jwtService.verifyAsync(token);
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }


    public async login(payload: { username: string, password: string }) {
        const user = await this.userService.findOneByUsername(payload.username);
        if (!user) {
            return new BadRequestException(LoginFailedErr)
        }

        const match = await this.comparePassword(payload.password, user.password);
        if (!match) {
            return new BadRequestException(LoginFailedErr)
        }

        const token = await this.generateToken({sub: user.id, username: user.username, role: user.role}, {expiresIn: '300s'});
        const refreshToken = await this.generateToken({sub: user.id, username: user.username, role: user.role, isRefreshToken: true}, {expiresIn: '60d'})
        
        return { token, refreshToken };
    }


    async refreshToken(refreshToken:RefreshTokenDto){
        const decodedToken = await this.decodeToken(refreshToken.refreshToken);
        
        if(!decodedToken.isRefreshToken){
            throw new UnauthorizedException('Please provide refresh token.')
        }

        const token = await this.generateToken({
            sub: decodedToken.sub, 
            username: decodedToken.username, 
            role: decodedToken.role
        },{
            expiresIn: '300s'
        });
        
        console.log(token)
        return {token};
    }


    public async create(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

}
