import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards} from '@nestjs/common';
import CreateProductDto from '../../api/dtos/product/create-product.dto';
import UpdateProductBodyDto from '../../api/dtos/product/update-product.dto';
import ProductRepository from "../../externals/datasource/typeorm/repositories/product.repository";
import ProductPresenter from '../../adapters/presenters/product.presenter';
import ProductEntity from '../../core/entities/product.entity';
import ProductCategory from '../../core/enums/product-category.enum';
import ProductUseCase from "../../core/usecases/product.usecase";
import ProductGateway from "../gateways/product.gateway";
import {AdminGuard} from "../../api/validators/admin-guard";
import { UUID } from 'crypto';

@Controller('products')
@UseGuards(AdminGuard)
export default class ProductController {
  private readonly _productGateway = new ProductGateway(
    this._productRepository
  );
  private readonly _productUseCase = new ProductUseCase(this._productGateway);

  constructor(private _productRepository: ProductRepository) {}

  @Get()
  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this._productUseCase.findAllProducts();
    return ProductPresenter.PresentMany(products);
  }

  @Get(':id')
  async findOneProductById(@Param('id') id: UUID) {
    const product = await this._productUseCase.findOneProductById(id);
    return ProductPresenter.PresentOne(product);
  }

  @Get('category/:category')
  async findProductsByCategory(@Param('category') category: ProductCategory): Promise<ProductEntity[]> {
    const products = await this._productUseCase.findProductsByCategory(category);
    return ProductPresenter.PresentMany(products);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = new ProductEntity(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.category
    );

    const newProduct = await this._productUseCase.createProduct(product);
    return ProductPresenter.PresentOne(newProduct);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: UUID,
    @Body() updateProductDto: UpdateProductBodyDto
  ) {
    const product = new ProductEntity(
      updateProductDto.name,
      updateProductDto.description,
      updateProductDto.price,
      updateProductDto.category,
      id
    );

    const updatedProduct = await this._productUseCase.updateProduct(product);
    return ProductPresenter.PresentOne(updatedProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: UUID): Promise<void> {
    await this._productUseCase.deleteProduct(id);
  }
}
