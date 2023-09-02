import { SetMetadata } from '@nestjs/common';
import { ROLES, Role } from 'src/shared/constants/global.constants';

const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
