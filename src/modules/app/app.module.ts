import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  // configure
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
