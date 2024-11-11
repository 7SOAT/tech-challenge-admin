
import ProductModel from "@models/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import ProductCategory from "core/enums/product-category.enum";
import { UUID } from 'crypto';
import { Repository } from "typeorm";

export default class ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private _productRepository: Repository<ProductModel>
  ) {}

  async findOneById(id: UUID): Promise<ProductModel> {
    return await this._productRepository.findOneBy({id});
  }

  async findAll(): Promise<ProductModel[]> {
    return await this._productRepository.find();
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<ProductModel[]> {
    return await this._productRepository.findBy({ category });
  }
  
  async insert(product: ProductModel): Promise<ProductModel> {
    return await this._productRepository.save(product);
  }

  async update(id: UUID, product: ProductModel): Promise<number> {
    const result = await this._productRepository.update(id, product);
    return result.affected;
  }

  async delete(id: UUID): Promise<number> {
    const result = await this._productRepository.delete(id.toString());
    return result.affected;
  }
}
