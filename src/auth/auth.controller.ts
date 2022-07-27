import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto){
        console.log("sdsd");
        
       return await this.authService.create(createUserDto)
    }

    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.body);
    }

}
