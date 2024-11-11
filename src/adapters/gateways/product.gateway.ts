
import ProductRepository from "@datasource/typeorm/repositories/product.repository";
import IProductGateway from "@interfaces/datasource/product.gateway";
import ProductModel from "@models/product.model";
import { plainToInstance } from "class-transformer";
import ProductEntity from "core/entities/product.entity";
import ProductCategory from "core/enums/product-category.enum";
import { UUID } from 'crypto';

export default class ProductGateway implements IProductGateway {
  constructor(
    private _productRepository: ProductRepository
  ) {}

  async findOneById(id: UUID): Promise<ProductEntity> {
    const product: ProductModel = await this._productRepository.findOneById(id);
    const mappedProduct = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      product,
      {enableImplicitConversion: true}
    );

    return mappedProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products: ProductModel[] = await this._productRepository.findAll();

    const mappedProducts = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<ProductModel[]> {
    const products = await this._productRepository.findByCategory(category);

    const mappedProducts = plainToInstance<ProductModel, ProductModel>(
      ProductModel,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }
  
  async insert(product: ProductEntity): Promise<ProductEntity> {
    const mappedProduct = this.adaptEntityToModel(product);
    
    const result = await this._productRepository.insert(mappedProduct);

    return this.adaptModelToEntity(result);
  }

  async update(id: UUID, product: ProductEntity): Promise<void> {
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel, 
      product,
      {enableImplicitConversion: true}
    );
    const result = await this._productRepository.update(id, mappedProduct);    
  }

  async delete(id: UUID): Promise<void> {
    await this._productRepository.delete(id);
  }

  private adaptEntityToModel(productE: ProductEntity): ProductModel {
    const {
      name,
      description,
      price,
      category,
      id
    } = productE;

    return new ProductModel({
      name,
      description,
      price,
      category,
      id
    });
  }

  private adaptModelToEntity(productM: ProductModel): ProductEntity {
    const {
      name,
      description,
      price,
      category,
      id
    } = productM;

    return new ProductEntity(      
      name,
      description,
      price,
      category,
      id
    );
  }
}
