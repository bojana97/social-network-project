import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';
import { Response } from 'express';
import { UserStatusEnum } from 'src/users/enums/user.status.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(
    request,
    response: Response,
    next: () => void,
  ): Promise<any> {
    const authorizationHeader: string = request.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      this.logException(request, 'Bearer not provided');
      return next();
    }

    const token: string = authorizationHeader.replace('Bearer ', '');

    try {
      const { sub:userId, isRefreshToken } =
        await this.authService.decodeToken(token);

      if (isRefreshToken) {
        this.logException(request, 'refresh is provided');
        return next();
      }

      request.user = await this.userService.findOneById(userId);

      if(request.user.status == UserStatusEnum.INACTIVE){
        this.logException(request, 'User is deactivated.');
        return next();
      }

    } catch (err) {
      this.logException(request, err.message);
    }
    return next();
  }

  logException(request, message: string) {
    request.authError = message;
    this.logger.log(message);
  }
}