import ProductCategory from '@enums/product-category.enum';
import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from "typeorm";
import BaseModel from './base.model';

@Entity({ name: "product" })
export default class ProductModel extends BaseModel<ProductModel> {
  @PrimaryColumn("uuid")
  id: UUID;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "enum", enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "numeric", scale: 2})
  price: number;

  @Column({ type: "varchar", length: 1000 })
  description: string;  
}
