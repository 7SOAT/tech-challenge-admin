import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigModule from './typeorm.module';
import ProductRepository from "./repositories/product.repository";
import ProductController from "../../../adapters/controllers/product.controller";
import ProductModel from "../../../package/models/product.model";
import Product from "../../../core/entities/product.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductModel, ProductRepository, ProductController],
  exports: [ProductModel],
})
export class TestModule {}
