import PaymentStatusEntity from "@entities/payment/payment-status.entity";
import PaymentEntity from "@entities/payment/payment.entity";
import PaymentStatusEnum from "@enums/payment-status.enum";
import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import IOrderGateway from "@interfaces/datasource/order.gateway";
import IPaymentGateway from "@interfaces/datasource/payment.gateway";
import IProductGateway from "@interfaces/datasource/product.gateway";
import PaymentProvider from "@providers/mercado-pago/mercado-pago.provider";
import CustomerEntity from "core/entities/customer.entity";
import OrderEntity from "core/entities/order/order.entity";
import ProductEntity from "core/entities/product.entity";
import OrderStatusEnum from "core/enums/order-status.enum";
import { UUID } from "crypto";

export default class OrderUseCase {
  constructor(
    private _orderGateway: IOrderGateway,
    private _customerGateway: ICustomerGateway,
    private _productGateway: IProductGateway,
    private _paymentGateway: IPaymentGateway
  ) {
  }

  async findOrdersQueue(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findQueue();
  }

  async findAllOrders(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findAll();
  }

  async findOneById(id: UUID): Promise<OrderEntity> {
    return await this._orderGateway.findById(id);
  }

  async checkoutOrder(productIds: UUID[], customerId: UUID): Promise<any> {
    try {
      const products: ProductEntity[] = await this.validateProducts(productIds);
      const customer: CustomerEntity = await this._customerGateway.findOneById(
        customerId,
      );
      const payment: PaymentEntity = new PaymentEntity(
        new PaymentStatusEntity(PaymentStatusEnum.PENDING)
      );
      
      const order: OrderEntity = new OrderEntity(
        { id: OrderStatusEnum.PENDING },
        products,
        payment,
        customer
      );

      await this._paymentGateway.insert(payment);
      const createdOrder = await this._orderGateway.createOrder(order);
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }

  private async validateProducts(productIds: UUID[]): Promise<ProductEntity[]> {
    return await Promise.all(productIds.map(async productId => {
      const resultProduct: ProductEntity = await this._productGateway.findOneById(productId);

      if (!resultProduct) {
        throw new Error(`Product not found: ${productId}`);
      }

      return resultProduct;
    }));
  }
}