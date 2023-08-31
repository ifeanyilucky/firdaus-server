import { Body, Controller, Response, Post } from '@nestjs/common';
import { LoginUserDTO, RegisterAuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response as IResponse } from 'express';
import { JWT_EXPIRY_SECONDS } from 'src/shared/constants/global.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() userDto: LoginUserDTO, @Response() res: IResponse) {
    const loginData = await this.authService.login(userDto);

    res.cookie('accessToken', loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      secure: true,
    });

    return res.status(200).json(loginData);
  }

  @Post('register')
  async register(@Body() userDto: RegisterAuthDTO, @Response() res: IResponse) {
    const registrationData = await this.authService.register(userDto);
    res.cookie('accessToken', registrationData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      secure: true,
    });

    res.status(200).json(registrationData);
  }
}
