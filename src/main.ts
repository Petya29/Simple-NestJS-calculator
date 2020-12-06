import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '../public'));
  app.setBaseViewsDir([
    join(__dirname, '..', '../public/views'),
    join(__dirname, '..', '../public/views/stylesheets')
]);

  app.setViewEngine('hbs');

  const options = new DocumentBuilder()      // Swagger api
    .setTitle('Calculator example')
    .setDescription('The calculator API description')
    .setVersion('1.0')
    .addTag('calculates')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();