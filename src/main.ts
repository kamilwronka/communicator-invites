import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/types';
import { configureMockserver } from './mocks/configure-mockserver';
import { configureSwagger } from './swagger';
import { RuntimeEnvironment } from './types/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const { port, env } = configService.get<AppConfig>('app');

  configureSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (env === RuntimeEnvironment.LOCAL) {
    await configureMockserver();
  }

  Logger.log(`Starting application on port: ${port}`, 'App');
  await app.listen(port);
}
bootstrap();
