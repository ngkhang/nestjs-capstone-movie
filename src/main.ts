import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { setupSwagger } from './common/swagger/swagger.util';
import { ConfigService } from './common/config/config.service';

async function bootstrap() {
  // Define port, config server
  const app = await NestFactory.create(AppModule);

  // Setup Config module
  const configService = app.get(ConfigService);
  const { host, port } = configService.app;

  // Define static assets folder
  app.use(express.static('.'));

  // Setup Swagger
  setupSwagger(app);

  await app.listen(port, () =>
    console.log(`Server is running on: http://${host}:${port}`),
  );
}
bootstrap();
