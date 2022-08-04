import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/user.modul';
import { UserService } from 'src/users/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
    UserService, 
  ],
  controllers: [AuthController],
  exports: [AuthService]
})

export class AuthModule {}
