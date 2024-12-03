import EnvironmentConfigService  from "api/config/environment-config/environment-config.service";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const postgresDataSource = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "secretuser",
    password: "passwordmostsecret",
    database: "fiaptech",
    synchronize: true,
    entities: [__dirname + "..\\models\\*.model.ts"],
    ssl: false,
    autoLoadEntities: true
  } as TypeOrmModuleOptions);
