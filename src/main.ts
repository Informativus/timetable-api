import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SuccessStatusDto } from './dto/successStatus.dto';
import { CreateReplacementDto } from './dto/replacement/createReplacement.dto';
import { MAIN_PATH, DEFAULT_PORT, SWAGGER } from './config/constants/constants';
import { replacementsGRPCOptions } from './grpcOtions/replacementsGRPC.options';
import { timetableGRPCOptions } from './grpcOtions/timetableGRPC.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(MAIN_PATH);

  const config = new DocumentBuilder()
    .setTitle('Timetable API')
    .setDescription('This API for timetable application')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CreateReplacementDto, SuccessStatusDto],
  });
  SwaggerModule.setup(SWAGGER, app, document);

  const appMicroserviceReplacements = await NestFactory.createMicroservice(
    AppModule,
    replacementsGRPCOptions,
  );

  const appMicroserviceTimetable = await NestFactory.createMicroservice(
    AppModule,
    timetableGRPCOptions,
  );

  await appMicroserviceReplacements.listen();
  await appMicroserviceTimetable.listen();
  await app.listen(DEFAULT_PORT);
}

bootstrap();
