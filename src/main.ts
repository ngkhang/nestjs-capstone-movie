import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { ConfigService } from '@config/config.service';
import { setupSwagger } from './common/swagger/swagger.util';

import helmet from 'helmet';

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

  // Setup Swagger
  setupSwagger(app);

  await app.listen(port, () =>
    console.log(`Server is running on: http://${host}:${port}`),
  );
}
bootstrap();
