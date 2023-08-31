import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService){}

  async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      request.user = await this.getAuth(request)
  }

  async getAuth(req: any): Promise<any> {
    try {
        let token;

        if(req.headers.authorization && req.headers.startsWith('Bearer'))
    }
  }
}
