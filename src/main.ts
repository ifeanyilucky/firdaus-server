import { NestFactory } from '@nestjs/core';
import { API_PREFIX, PORT } from './shared/constants/global.constants';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('FIRDAUS API DOC V1')
    .setDescription('The Firdaus Gate API Documentation')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.use(cors());
  // app.use(cookieParser());

  await app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
