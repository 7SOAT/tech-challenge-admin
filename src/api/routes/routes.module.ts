import { HttpModule } from "@nestjs/axios";
import { DynamicModule } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import EnvironmentConfigService from "api/config/environment-config/environment-config.service";
import ProductRoute from "../routes/product/product.route";
import RepositoriesModule from "../../externals/datasource/typeorm/repositories/repositories.module";
import { JwtModule } from "@nestjs/jwt";

export default class RoutesModule {
    static resgister(): DynamicModule {
        return {
            module: this,
            imports: [TerminusModule, HttpModule, RepositoriesModule.resgister(), JwtModule],
            providers: [
                EnvironmentConfigService,
            ],
            controllers: [
                ProductRoute,
            ]
        }
    }
};
