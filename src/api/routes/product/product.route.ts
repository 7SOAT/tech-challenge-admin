import CreateProductDto from '../../../api/dtos/product/create-product.dto';
import UpdateProductBodyDto from '../../../api/dtos/product/update-product.dto';
import { CreateProductSwaggerConfig } from '../../config/swagger/product/create-product.swagger';
import { DeleteProductSwaggerConfig } from '../../config/swagger/product/delete-product.swagger';
import { FindAllProductsSwaggerConfig } from '../../config/swagger/product/find-all-products.swagger';
import { FindProductByIdSwaggerConfig } from '../../config/swagger/product/find-product-by-id.swagger';
import { FindProductsByCategorySwaggerConfig } from '../../config/swagger/product/find-products-by-category.swagger';
import { UpdateProductSwaggerConfig } from '../../config/swagger/product/update-product.swagger';
import ProductRepository from '../../../externals/datasource/typeorm/repositories/product.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ProductController from '../../../adapters/controllers/product.controller';
import ProductEntity from '../../../core/entities/product.entity';
import { UUID } from 'crypto';
import ProductGateway from "../../../adapters/gateways/product.gateway";
import ProductUseCase from "../../../core/usecases/product.usecase";
import { AdminGuard } from "../../validators/admin-guard";
import ProductCategory from "../../../core/enums/product-category.enum";

@ApiTags('products')
@Controller('products')
@UseGuards(AdminGuard)
export default class ProductRoute {
  private readonly _productGateway = new ProductGateway(
      this._productRepository
    );
  private readonly _productUseCase = new ProductUseCase(this._productGateway);
  private readonly _productController = new ProductController(
    this._productUseCase
  );

  constructor(private _productRepository: ProductRepository) {}

  @Get('/:productId')
  @FindProductByIdSwaggerConfig()
  async findOneById(@Param('productId') id: UUID) {
    try {
      return await this._productController.findOneProductById(id);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @FindAllProductsSwaggerConfig()
  async find(): Promise<ProductEntity[]> {
    try {
      return await this._productController.findAllProducts();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/by-category/:productCategory')
  @FindProductsByCategorySwaggerConfig()
  async findByCategory(
    @Param("productCategory") category: ProductCategory,
  ): Promise<ProductEntity[]> {
    try {
      return await this._productController.findProductsByCategory(category);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  @CreateProductSwaggerConfig()
  async create(@Body() input: CreateProductDto) {
    try {
      return await this._productController.createProduct(input);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('/:id')
  @UpdateProductSwaggerConfig()
  async update(@Param('id') id: UUID, @Body() body: UpdateProductBodyDto) {
    try {
      return await this._productController.updateProduct(id, body);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('/:productId')
  @DeleteProductSwaggerConfig()
  async delete(@Param('productId') id: UUID) {
    try {
      await this._productController.deleteProduct(id);
      return;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
