import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { ConfigService } from '@config/config.service';
import { setupSwagger } from './common/swagger/swagger.util';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './config/response.interceptor';

async function bootstrap() {
  // Define port, config server
  const app = await NestFactory.create(AppModule);

  // Setup Config module
  const configService = app.get(ConfigService);
  const { host, port } = configService.app;

  // Setup helmet
  app.use(helmet());

  // Setup CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-type, Accept',
    credentials: true,
  });

  // Define static assets folder
  app.use(express.static('.'));

  // Add ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Apply Response Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Setup Swagger
  setupSwagger(app);

  await app.listen(port, () =>
    console.log(`Server is running on: http://${host}:${port}`),
  );
}
bootstrap();
