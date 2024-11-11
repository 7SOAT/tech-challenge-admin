import CustomerEntity from '@entities/customer.entity';
import ProductEntity from '@entities/product.entity';
import { randomUUID, UUID } from 'crypto';
import OrderStatusEntity from './order-status.entity';
import PaymentEntity from '@entities/payment/payment.entity';
import OrderStatusEnum from '@enums/order-status.enum';

export default class OrderEntity {
  public readonly totalValue: number;

  constructor(
    public readonly status: OrderStatusEntity = new OrderStatusEntity(OrderStatusEnum.PENDING),
    public readonly products: ProductEntity[],
    public readonly payment: PaymentEntity,
    public readonly customer: CustomerEntity = null,
    public readonly orderNumber: number = null,
    public readonly id: UUID = randomUUID()
  ) {
    this.totalValue = parseFloat(
      products.reduce<number>((a, b) => 
        a + parseFloat(b.price.toString()), 0).toFixed(2));
  }
}
