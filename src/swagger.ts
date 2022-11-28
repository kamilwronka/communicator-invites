import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const title = 'Invites service';
const description = 'Service responsible for invites management.';
const tag = 'invites';

export const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(process.env.npm_package_version)
    .addTag(tag)
    .addServer('/invites')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
};
