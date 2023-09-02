import { NestFactory } from '@nestjs/core';
import { API_PREFIX, PORT } from './shared/constants/global.constants';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { join } from 'path';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix(API_PREFIX);

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalFilters(new InvalidFormExceptionFilter());

  // app.use(cors());
  // app.use(cookieParser());

  await app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
