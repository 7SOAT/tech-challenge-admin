import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseConfig from '@interfaces/config/database.config';

@Injectable()
export default class EnvironmentConfigService implements DatabaseConfig{
  constructor(private configService: ConfigService) {}

  public getApiPort(): number{
    return this.configService.get<number>('API_PORT');
  }

  public getDatabaseHost(): string {
    return this.configService.get<string>('POSTGRES_HOST');
  }

  public getDatabasePort(): number {
    return this.configService.get<number>('POSTGRES_PORT');
  }

  public getDatabaseUser(): string {
    return this.configService.get<string>('POSTGRES_USER');
  }

  public getDatabasePassword(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }

  public getDatabaseName(): string {
    return this.configService.get<string>('POSTGRES_DATABASE');
  }

  public getEnableMockTables(): boolean{
    return this.configService.get<boolean>('ENABLE_MOCK_TABLES');
  }

}
