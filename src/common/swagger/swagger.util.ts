import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setExternalDoc(
      '/swagger/v1/swagger.json',
      'http://localhost:3000/swagger/v1/swagger.json',
    )
    .setTitle('Movie Ticket Booking API')
    .setDescription('API for booking movie tickets')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    // .addServer('http://localhost:3000/api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: '/swagger/v1/swagger.json',
    customSiteTitle: 'Movie Ticket API',
  });
};
