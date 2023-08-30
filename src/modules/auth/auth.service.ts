import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserServices } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(jwtService: JwtService, userService: UserServices);
  login(user: UserService) {}
}
