import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto){
       return await this.authService.create(createUserDto)
    }

    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.body);
    }

    @Post('/refresh')
    async refreshToken(@Body() refreshTokenDto:RefreshTokenDto){
        return this.authService.refreshToken(refreshTokenDto)
    }

}
