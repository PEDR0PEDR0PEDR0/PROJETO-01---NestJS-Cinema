import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global (importante para os DTOs funcionarem)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API para gestão de cinema - Laboratório NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();