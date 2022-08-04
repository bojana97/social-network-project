import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('IS REFRESH TOKEN ', request.user.isRefreshToken)

    if(request.user.isRefreshToken){
      throw new UnauthorizedException('Please provide access token.')
    }
    return request.user;
  },
);