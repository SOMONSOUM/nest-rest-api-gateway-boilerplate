import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get<string>('API_PREFIX', 'api'));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown props
      forbidNonWhitelisted: true,
      transform: true, // auto-transform to DTO types
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Docs for API Gateway')
    .setDescription('API documentation for the NestJS REST API boilerplate')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);

  Logger.log(`🎉 Nest application is listening on: http://localhost:${port}`);
}
void bootstrap();
