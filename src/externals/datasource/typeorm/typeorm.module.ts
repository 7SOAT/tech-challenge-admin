import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EnvironmentConfigService  from 'api/config/environment-config/environment-config.service';
import { postgresDataSource } from '@datasource/typeorm/postgres.data-source';
import EnvironmentConfigModule from 'api/config/environment-config/environment-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: postgresDataSource,
    }),
  ],
})
export default class TypeOrmConfigModule {}