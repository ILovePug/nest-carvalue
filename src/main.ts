import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import cookieSession from 'cookie-session';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['sdfsdgsdfsd'],
    }),
  );

  // used for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      // strip out any unmapped DTO properties
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
