import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/shared/constants/global.constants';

enum Roles {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}
const ROLES_KEY = 'roles';

export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
