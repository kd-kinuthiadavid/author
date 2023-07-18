import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Author: Authentication, Authorization & User Management.')
    .setDescription('API documentation for Author')
    .setVersion('1.0')
    .addTag('Author')
    .build();

  const docsOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, docsOptions);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
