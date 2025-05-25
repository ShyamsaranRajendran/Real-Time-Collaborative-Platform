import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if you plan to call APIs from a frontend running on a different domain/port
  app.enableCors();

  // Listen on port 3000 (default)
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
