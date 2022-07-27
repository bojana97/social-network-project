import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../enums/user.role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log('REQUIRED ROLES -> ',requiredRoles)

        if (!requiredRoles) {
        return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredRoles == user.role //since user can have only one role, no need for UserRoleEnum[], therefor no need for some method??? -> 
        // return true//requiredRoles.some((role) => user.roles?.includes(role))
    }
}