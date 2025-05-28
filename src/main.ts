import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helper';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
