import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import EnvironmentConfigModule from "api/config/environment-config/environment-config.module";
import RoutesModule from "api/routes/routes.module";
import RepositoriesModule from "../src/externals/datasource/typeorm/repositories/repositories.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    EnvironmentConfigModule,
    HttpModule,
    TypeOrmModule,
    RoutesModule.resgister(),
    RepositoriesModule.resgister(),
  ],
})

export default class AppModule {}
