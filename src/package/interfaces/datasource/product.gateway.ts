import ProductEntity from 'core/entities/product.entity';
import ProductCategory from 'core/enums/product-category.enum';
import { UUID } from 'crypto';

export default interface IProductGateway {
  insert(product: ProductEntity): Promise<ProductEntity>;
  update(id: UUID, product: ProductEntity): Promise<void>;
  delete(id: UUID): Promise<void>;
  findAll(): Promise<Array<ProductEntity>>;
  findOneById(id: UUID): Promise<ProductEntity>;
  findByCategory(category: ProductCategory): Promise<Array<ProductEntity>>;
}
