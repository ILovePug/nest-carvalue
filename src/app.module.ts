import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', //db file name
      entities: [User, Report],
      synchronize: true, // only for development
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,

      // used for DTO validation
      useValue: new ValidationPipe({
        // strip out any unmapped DTO properties
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // apply middlewares to the modules
  configure(consumer: MiddlewareConsumer) {
    // can apply more than 1 middlwares
    consumer
      .apply(
        cookieSession({
          keys: ['sdfsdgsdfsd'],
        }),
      )
      .forRoutes('*'); // applies on all routes which means global
  }
}
