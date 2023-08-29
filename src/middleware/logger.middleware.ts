import { NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: CallableFunction): void {
    console.log(`
            [API_REQUEST] - ${req.method} ${req.originalUrl}: ${JSON.stringify(
      req.body,
    )}
 `);
    next();
  }
}
