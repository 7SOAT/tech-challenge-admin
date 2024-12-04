import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import MockTables from '../src/externals/datasource/typeorm/seed/mock-tables.mock';
import EnvironmentConfigService from 'api/config/environment-config/environment-config.service';
import DatabaseConfig from '../src/package/interfaces/config/database.config';
import AppConfig from '../src/package/interfaces/config/app.config';

export default async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const databaseConfig: DatabaseConfig = app.get<DatabaseConfig>(EnvironmentConfigService);
  const apiConfig: AppConfig = app.get<AppConfig>(EnvironmentConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('Application for creating and tracking orders.')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const port = apiConfig.getApiPort() || 3001;

  try {
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error(`Error while starting server on port ${port}:`, error);
  }

  const enableMockTables: boolean = databaseConfig.getEnableMockTables();
  await MockTables(app, enableMockTables);
}
