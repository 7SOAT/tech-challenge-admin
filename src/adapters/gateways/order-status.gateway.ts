import OrderStatusRepository from '@datasource/typeorm/repositories/order-status.repository';
import IOrderStatusGateway from '@interfaces/datasource/order-status.gateway';
import OrderStatusModel from '@models/order/order-status.model';
import { plainToInstance } from 'class-transformer';
import OrderStatusEntity from 'core/entities/order/order-status.entity';

export default class OrderStatusGateway implements IOrderStatusGateway {
  constructor(
    private _orderRepository: OrderStatusRepository
  ) { }

  async findAll(): Promise<OrderStatusEntity[]>{
    const result = await this._orderRepository.findAll();
    return plainToInstance<OrderStatusEntity, OrderStatusModel>(
      OrderStatusEntity,
      result,
      { enableImplicitConversion: true });
  }

  async insert(orderStatus: OrderStatusEntity): Promise<OrderStatusEntity> {
    try {
      const orderStatusModel = plainToInstance<OrderStatusModel, OrderStatusEntity>(
        OrderStatusModel,
        orderStatus,
        { enableImplicitConversion: true });
      
      const result = await this._orderRepository.insert(orderStatusModel);

      return plainToInstance<OrderStatusEntity, OrderStatusModel>(
        OrderStatusEntity,
        result,
        { enableImplicitConversion: true });
      
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
