import { DynamicModule } from "@nestjs/common";
import TypeOrmConfigModule from "../typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductModel from "../../../../package/models/product.model";
import ProductRepository from "./product.repository";

export default class RepositoriesModule {
    static resgister(): DynamicModule {

        const entities = [
            ProductModel,
        ]

        const repositories = [
            ProductRepository,
        ]

        return {
            module: this,
            imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
            providers: repositories,
            exports: repositories
        }
    }
};
