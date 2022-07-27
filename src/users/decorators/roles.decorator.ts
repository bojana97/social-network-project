import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user.role.enum';

//This decorator allows specifying what roles are required to access specific resources
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles); ///?