import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import appConfig from './config/app.config';
import { InvitesModule } from './invites/invites.module';
import { HealthController } from './health/health.controller';
import { MongoConfig } from './config/types';
import { TerminusModule } from '@nestjs/terminus';
import { ServersModule } from './servers/servers.module';
import { UsersModule } from './users/users.module';
import servicesConfig from './config/services.config';
import mongoConfig from './config/mongo.config';
import rabbitmqConfig from './config/rabbitmq.config';

@Module({
  imports: [
    InvitesModule,
    TerminusModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, port, password, user, database } =
          configService.get<MongoConfig>('mongodb');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}`,
          ssl: false,
          dbName: database,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, servicesConfig, mongoConfig, rabbitmqConfig],
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.string(),
        ENV: Joi.string(),
        MONGODB_PASSWORD: Joi.string(),
        MONGODB_USER: Joi.string(),
        MONGODB_HOST: Joi.string(),
        MONGODB_ACCESS_PORT: Joi.number(),
        MONGODB_DATABASE: Joi.string(),
        RABBITMQ_USER: Joi.string(),
        RABBITMQ_PASSWORD: Joi.string(),
        RABBITMQ_HOST: Joi.string(),
        RABBITMQ_ACCESS_PORT: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ServersModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
