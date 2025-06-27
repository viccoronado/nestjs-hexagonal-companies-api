import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Companies API')
    .setDescription('API for managing companies and their transfers')
    .setVersion('1.0')
    .addTag('Health Check', 'Endpoints for monitoring API health')
    .addTag('Companies', 'Endpoints for managing companies')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}