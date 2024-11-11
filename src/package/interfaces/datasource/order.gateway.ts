import { UUID } from 'crypto';
import OrderStatusEnum from 'core/enums/order-status.enum';
import OrderEntity from 'core/entities/order/order.entity';

export default interface IOrderGateway {
  createOrder(order: OrderEntity): Promise<OrderEntity>;
  findAll(): Promise<Array<OrderEntity>>;
  findById(id: UUID): Promise<OrderEntity>
  updateOrderStatus(id: UUID, status: OrderStatusEnum): Promise<number>
  findQueue(): Promise<Array<OrderEntity>>;
}