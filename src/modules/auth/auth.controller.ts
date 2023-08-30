import { Body, Controller, Response, Post } from '@nestjs/common';
import { LoginUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response as IResponse } from 'express';
import { JWT_EXPIRY_SECONDS } from 'src/shared/constants/global.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('post')
  async login(@Body() user: LoginUserDTO, @Response() res: IResponse) {
    const loginData = await this.authService.login(user);

    res.cookie('accessToken', loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      secure: true,
    });

    return res.status(200).json(loginData);
  }
}
