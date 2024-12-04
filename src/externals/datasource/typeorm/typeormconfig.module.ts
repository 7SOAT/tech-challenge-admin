import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigModule from './typeorm.module';
import ProductRepository from "./repositories/product.repository";
import ProductController from "../../../adapters/controllers/product.controller";
import ProductModel from "../../../package/models/product.model";
import Product from "../../../core/entities/product.entity";
import ProductUseCase from "../../../core/usecases/product.usecase";
import ProductRoute from "../../../api/routes/product/product.route";
import {Admin} from "typeorm";
import {AdminGuard} from "../../../api/validators/admin-guard";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductModel, ProductRepository, ProductController, ProductUseCase, ProductRoute, AdminGuard],
  exports: [ProductModel],
})
export class TestModule {}
