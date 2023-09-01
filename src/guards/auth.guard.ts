import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { retrieve } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.getAuth(request);
    return true;
  }

  async getAuth(req: any): Promise<any> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new BadRequestException('Invalid Authorization Token');
      }
      const token = authHeader.split(' ')[1];

      const { id } = await retrieve<{ id: any }>(token);
      const data = await this.prismaService.user.findFirst({
        where: { id: id },
      });

      if (!data)
        throw new UnauthorizedException('User with this token no longer exist');

      console.log(data);
      return data;
    } catch (error) {
      if (error.response) {
        throw new UnauthorizedException(
          error.response.data?.message || error.message,
        );
      }
      throw new BadRequestException(error.message);
    }
  }
}
