import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Configuración del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .join(', ');
        return new BadRequestException(messages);
      },
    }),
  );
 // Aumenta el límite de tamaño de solicitud a 10mb
 const httpAdapter = app.getHttpAdapter();
 if (httpAdapter instanceof ExpressAdapter) {
    const expressApp = httpAdapter.getInstance();
    expressApp.use(express.json({ limit: '10mb' }));
    expressApp.use(express.urlencoded({ limit: '10mb', extended: true }));
 }
  await app.listen(5000);
}
bootstrap();
