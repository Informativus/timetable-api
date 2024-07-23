import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReplacementsEmptyDto } from './dto/replacement/replacementsEmpty.dto';
import { CreateReplacementDto } from './dto/replacement/createReplacement.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Timetable API')
    .setDescription('This API for timetable application')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CreateReplacementDto, ReplacementsEmptyDto],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}

bootstrap();
