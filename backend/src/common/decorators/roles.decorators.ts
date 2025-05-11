import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/roles.enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);