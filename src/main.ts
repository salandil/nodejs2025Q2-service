import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helper';
import 'dotenv/config';
import { CustomExceptionFilter } from './logging/exceptions/exception.filter';
import { LoggingService } from './logging/logging.service';
import { RequestInterceptor } from './logging/exceptions/request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logging = new LoggingService();
  await logging.checkFolder();

  process.on('unhandledRejection', async (err: Error) => {
    const errorMessage =
      typeof err === 'object' && 'stack' in err
        ? err.stack || err
        : JSON.stringify(err);
    logging.error(`Unhandled Rejection. ${errorMessage}`);
  });

  app.useGlobalInterceptors(new RequestInterceptor(logging));

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new CustomExceptionFilter(httpAdapterHost));

  await app.listen(process.env.PORT || PORT);
}
bootstrap();
