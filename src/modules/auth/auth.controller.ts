import { Body, Controller, Response } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  async login(@Body() user, @Response() res): Promise<T> {
    const loginData = '';
  }
}
