import CreateProductDto from '@api/dtos/product/create-product.dto';
import UpdateProductBodyDto from '@api/dtos/product/update-product.dto';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import ProductGateway from '@gateways/product.gateway';
import ProductUseCase from '@usecases/product.usecase';
import ProductPresenter from 'adapters/presenters/product.presenter';
import ProductEntity from 'core/entities/product.entity';
import ProductCategory from 'core/enums/product-category.enum';
import { UUID } from 'crypto';

export default class ProductController {
  private readonly _productGateway = new ProductGateway(
    this._productRepository
  );
  private readonly _productUseCase = new ProductUseCase(this._productGateway);

  constructor(private _productRepository: ProductRepository) {}

  async findOneProductById(id: UUID) {
    const product = await this._productUseCase.findOneProductById(id);
    return ProductPresenter.PresentOne(product);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this._productUseCase.findAllProducts();
    return ProductPresenter.PresentMany(products);
  }

  async findProductsByCategory(
    category: ProductCategory
  ): Promise<ProductEntity[]> {
    const products = await this._productUseCase.findProductsByCategory(
      category
    );
    return ProductPresenter.PresentMany(products);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = new ProductEntity(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.category
    );

    const newProduct = await this._productUseCase.createProduct(product);
    return ProductPresenter.PresentOne(newProduct);
  }

  async updateProduct(id: UUID, updateProductDto: UpdateProductBodyDto) {
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

  async deleteProduct(id: UUID): Promise<void> {
    await this._productUseCase.deleteProduct(id);
  }
}
