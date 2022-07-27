import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../users/user.repository';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/user.modul';
import { UserService } from 'src/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule, 
    UsersModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  providers: [
    AuthService,
    ...UsersRepository, 
    LocalStrategy, 
    UserService, 
    JwtStrategy
  ],
  controllers: [AuthController]
})

export class AuthModule {}
