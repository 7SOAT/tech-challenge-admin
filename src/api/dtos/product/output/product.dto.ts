import ProductCategory from '@enums/product-category.enum';
import { UUID } from 'crypto';

export default class ProductDto {
  constructor(
    public id: UUID,    
    public name: string,
    public category: ProductCategory,
    public price: number,
    public description: string    
  ) {}    
}
