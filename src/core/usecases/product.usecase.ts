import ProductEntity from "@entities/product.entity";
import ProductCategory from "@enums/product-category.enum";
import IProductGateway from "@interfaces/datasource/product.gateway";
import { UUID } from "crypto";

export default class ProductUseCase {
  constructor(private _productGateway: IProductGateway) { }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    await this._productGateway.update(product.id, product);
    return product;
  }

  async findProductsByCategory(category: ProductCategory): Promise<Array<ProductEntity>> {
    return await this._productGateway.findByCategory(category);
  }

  async findOneProductById(id: UUID): Promise<ProductEntity> {
    try {
      return await this._productGateway.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllProducts(): Promise<Array<ProductEntity>> {
    return new Promise(async (resolve, reject) => {
      const products = await this._productGateway.findAll();
      resolve(products);
    });
  }

  async deleteProduct(id: UUID): Promise<void> {
    await this._productGateway.delete(id);    
  }

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    try {
      return await this._productGateway.insert(product);
    } catch (err) {
      throw err;
    }
  }
}