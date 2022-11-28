import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { InvitesModule } from './invites/invites.module';

@Module({
  imports: [
    InvitesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.string(),
        ENV: Joi.string(),
        MONGODB_PASSWORD: Joi.string(),
        MONGODB_USER: Joi.string(),
        MONGODB_HOST: Joi.string(),
        MONGODB_ACCESS_PORT: Joi.number(),
        MONGODB_DATABASE: Joi.string(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
