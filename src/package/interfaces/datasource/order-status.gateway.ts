import OrderStatusEntity from "core/entities/order/order-status.entity";

export default interface IOrderStatusGateway {
  insert(orderStatus: OrderStatusEntity): Promise<OrderStatusEntity>;
}

