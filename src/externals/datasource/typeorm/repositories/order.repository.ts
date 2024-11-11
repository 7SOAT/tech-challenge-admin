import OrderModel from '@models/order/order.model';
import { InjectRepository } from '@nestjs/typeorm';
import OrderStatusEntity from 'core/entities/order/order-status.entity';
import OrderStatusEnum from 'core/enums/order-status.enum';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';

export default class OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private _orderRepository: Repository<OrderModel>
  ) { }

  async findAll(): Promise<OrderModel[]> {
    try {
      return await this._orderRepository.find();
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findById(id: UUID): Promise<OrderModel> {
    try {
      return await this._orderRepository.findOneBy({id});
    } catch (error) {
      throw new Error(`Error finding order: ${error}`)
    }
  }

  async findQueue(): Promise<Array<OrderModel>> {
    try {
      const result: OrderModel[] = await this._orderRepository.find({
        where: [
          { status: { id: OrderStatusEnum.RECEPTED } },
          { status: { id: OrderStatusEnum.IN_PREPARATION } },
          { status: { id: OrderStatusEnum.READY } }
        ],
        order: {
          status: { priorityOrder: 'ASC' },
          createdAt: 'ASC'
        },
      })

      return result;

    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async insert(order: OrderModel): Promise<OrderModel> {
    try {
      await this._orderRepository.save(order);
      const result = await this._orderRepository.findOneBy({ id: order.id});
      return result;
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateOrderStatus(orderId: UUID, statusEnum: OrderStatusEnum): Promise<number> {
    try {
      const result = await this._orderRepository.update(orderId.toString(), { status: new OrderStatusEntity(statusEnum) });
      return result.affected;
    } catch (error) {
      throw new Error(`Error updating status: ${error}`);
    }
  }
}
