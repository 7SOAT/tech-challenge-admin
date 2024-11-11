import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import OrderStatusEntity from '@entities/order/order-status.entity';
import PaymentEntity from '@entities/payment/payment.entity';
import IOrderGateway from '@interfaces/datasource/order.gateway';
import OrderModel from '@models/order/order.model';
import { plainToInstance } from 'class-transformer';
import CustomerEntity from 'core/entities/customer.entity';
import OrderEntity from 'core/entities/order/order.entity';
import ProductEntity from 'core/entities/product.entity';
import OrderStatusEnum from 'core/enums/order-status.enum';
import { UUID } from 'crypto';


export default class OrderGateway implements IOrderGateway {
  constructor(
    private _orderRepository: OrderRepository
  ) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result: OrderModel[] = await this._orderRepository.findAll();
      return result.map((orderM) => this.fromModelToEntity(orderM));
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findById(id: UUID): Promise<OrderEntity> {
    try {
      const result = await this._orderRepository.findById(id);
      return this.fromModelToEntity(result);
    } catch (error) {
      throw new Error(`Error finding order: ${error}`)
    }
  }

  async findQueue(): Promise<Array<OrderEntity>> {
    try {
      const result: OrderModel[] = await this._orderRepository.findQueue()
      return result.map((orderM) => this.fromModelToEntity(orderM));
    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    try {

      const orderDataModel = plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        order,
        { enableImplicitConversion: true, enableCircularCheck: true }
      );

      const result = await this._orderRepository.insert(orderDataModel);
      return this.fromModelToEntity(result);
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateOrderStatus(orderId: UUID, statusEnum: OrderStatusEnum): Promise<number> {
    try {
      const result = await this._orderRepository.updateOrderStatus(orderId, statusEnum);
      return result;
    } catch (error) {
      throw new Error(`Error updating status: ${error}`);
    }
  }

  private fromModelToEntity(orderM: OrderModel){
    const {customer, products, status, payment} = orderM;

    const statusEntity = new OrderStatusEntity(
      status?.id,
      status?.description,
      status?.name
    );

    const productEntities = products.map((productM) => new ProductEntity(
      productM.name,
      productM.description,
      productM.price,
      productM.category,
      productM.id
    ));

    const paymentEntity = new PaymentEntity(
      payment?.status,
      payment?.externalId,
      payment?.id
    );

    const customerEntity = customer ? new CustomerEntity(
      customer.name,
      customer.email,
      customer.cpf,
      customer.id
    ) : null

    return new OrderEntity(
      statusEntity,
      productEntities,
      paymentEntity,
      customerEntity,
      orderM.orderNumber,
      orderM.id
    )
  }
}
