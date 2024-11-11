import CheckoutOrderDto from '@api/dtos/order/input/checkout-order.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import PaymentRepository from '@datasource/typeorm/repositories/payment.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import CustomerGateway from '@gateways/customer.gateway';
import OrderGateway from '@gateways/order.gateway';
import PaymentGateway from '@gateways/payment.gateway';
import ProductGateway from '@gateways/product.gateway';
import OrderUseCase from '@usecases/order.usecase';
import OrderPresenter from 'adapters/presenters/order.presenter';
import { UUID } from 'crypto';

export default class OrderController {
  private readonly _orderGateway = new OrderGateway(this._orderRepository);
  private readonly _customerGateway = new CustomerGateway(this._customerRepository);
  private readonly _productGateway = new ProductGateway(this._productRepository);
  private readonly _paymentGateway = new PaymentGateway(this._paymentRepository);

  private readonly _orderUseCase = new OrderUseCase(
    this._orderGateway,
    this._customerGateway,
    this._productGateway,
    this._paymentGateway
  );

  constructor(
    private _orderRepository: OrderRepository,
    private _customerRepository: CustomerRepository,
    private _productRepository: ProductRepository,
    private _paymentRepository: PaymentRepository
  ) { }

  async findAllOrders() {
    return OrderPresenter.PresentMany(await this._orderUseCase.findAllOrders());
  }

  async findOrderById(id: UUID) {
    return OrderPresenter.PresentOne(await this._orderUseCase.findOneById(id));
  }

  async findOrdersQueue() {
    return OrderPresenter.PresentMany(
      await this._orderUseCase.findOrdersQueue()
    );
  }

  async checkoutOrder(order: CheckoutOrderDto) {
    return await this._orderUseCase.checkoutOrder(order.productIds, order.customerId);
  }
}
