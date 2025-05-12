import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  // Create app with rawBody enabled
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // Apply raw body parser FIRST for Stripe webhooks
  app.use(
    '/api/webhooks/stripe',
    express.raw({
      type: 'application/json',
      limit: '1mb',
    }),
    (req, res, next) => {
      // Manually assign raw body buffer to req.rawBody
      req.rawBody = req.body;
      next();
    }
  );
  

  // Then apply other middleware
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.enableCors();

  await app.listen(process.env.PORT ?? 8000);
  console.log('🚀 Server is running on port: 8000');
}
bootstrap();