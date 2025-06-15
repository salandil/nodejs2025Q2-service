import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helper';
import 'dotenv/config';
import { CustomExceptionFilter } from './logging/exceptions/exception.filter';
import { LoggingService } from './logging/logging.service';
import { RequestInterceptor } from './logging/exceptions/request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggingService = new LoggingService();

  process.on('unhandledRejection', async (err: Error) => {
    loggingService.error(`Unhandled Rejection. ${err.message}`);
  });

  app.useGlobalInterceptors(new RequestInterceptor(loggingService));

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new CustomExceptionFilter(httpAdapterHost));

  await app.listen(process.env.PORT || PORT);
}
bootstrap();
