/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

const Port = AppConfig.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Port);
}
bootstrap();
