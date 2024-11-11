import CreateProductDto from '@api/dtos/product/create-product.dto';
import UpdateProductBodyDto from '@api/dtos/product/update-product.dto';
import { CreateProductSwaggerConfig } from '@api/config/swagger/product/create-product.swagger';
import { DeleteProductSwaggerConfig } from '@api/config/swagger/product/delete-product.swagger';
import { FindAllProductsSwaggerConfig } from '@api/config/swagger/product/find-all-products.swagger';
import { FindProductByIdSwaggerConfig } from '@api/config/swagger/product/find-product-by-id.swagger';
import { FindProductsByCategorySwaggerConfig } from '@api/config/swagger/product/find-products-by-category.swagger';
import { UpdateProductSwaggerConfig } from '@api/config/swagger/product/update-product.swagger';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ProductController from 'adapters/controllers/product.controller';
import ProductEntity from 'core/entities/product.entity';
import { UUID } from 'crypto';

@ApiTags('products')
@Controller('products')
export default class ProductRoute {
  private readonly _productController = new ProductController(
    this._productRepository
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
    @Param('productCategory') category
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
