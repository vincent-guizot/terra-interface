import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🌿 Terra Interface Core Engine running on port ${port}`);
}
bootstrap();
