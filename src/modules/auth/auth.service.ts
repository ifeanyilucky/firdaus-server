import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDTO, RegisterAuthDTO } from './dto/auth.dto';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from 'src/configs/global.config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  public async login(loginUserDTO: LoginUserDTO) {
    const userData = await this.userService.getUser({
      email: loginUserDTO.email,
    });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const passwordIsMatch = AuthHelpers.verify(
      loginUserDTO.password,
      userData.password,
    );
    if (!passwordIsMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      ...userData,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });
    return {
      user: payload,
      accessToken,
    };
  }

  public async register(registerUserDTO: RegisterAuthDTO) {
    const existingEmail = await this.userService.getUser({
      email: registerUserDTO.email,
    });
    if (existingEmail) {
      throw new UnauthorizedException();
    }

    return this.userService.createUser({ data: registerUserDTO });
  }
}
