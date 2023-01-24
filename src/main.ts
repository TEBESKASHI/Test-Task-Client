import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.SERVER_API_PORT)
  await app.listen(process.env.SERVER_API_PORT || DEFAULT_PORT);
}

bootstrap();
