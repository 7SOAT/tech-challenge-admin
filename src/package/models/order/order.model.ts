import CustomerModel from '@models/customer.model';
import OrderStatusModel from '@models/order/order-status.model';
import ProductModel from '@models/product.model';
import { UUID } from 'crypto';
import BaseModel from '../base.model';
import PaymentModel from '@models/payment/payment.model';
import { Entity, PrimaryColumn, ManyToOne, JoinTable, Column, ManyToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'order' })
export default class OrderModel extends BaseModel<OrderModel> {
  @PrimaryColumn('uuid')
  id: UUID;

  @ManyToOne(() => OrderStatusModel, (orderStatus) => orderStatus.id, { eager: true })
  @JoinTable()
  status: OrderStatusModel;

  @Column({ type: 'numeric', scale: 2 })
  totalValue: number;

  @ManyToMany(() => ProductModel, (product) => product.id, { eager: true })
  @JoinTable()
  products: ProductModel[];

  @ManyToOne(() => CustomerModel, (customer) => customer.id, { nullable: true, eager: true })
  customer: CustomerModel | null;

  @OneToOne(() => PaymentModel, { eager: true})
  @JoinColumn()
  payment: PaymentModel;

  @Column({ type: 'int', unique: true, nullable: false, generated: 'increment' })
  orderNumber: number;
}
