import ConfirmPaymentDto from '@api/dtos/payment/input/confirm-payment.dto';
import CreatePaymentDto from '@api/dtos/payment/input/create-payment.dto';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import PaymentRepository from '@datasource/typeorm/repositories/payment.repository';
import OrderGateway from '@gateways/order.gateway';
import PaymentProviderGateway from '@gateways/payment-provider.gateway';
import PaymentGateway from '@gateways/payment.gateway';
import PaymentUseCase from '@usecases/payment.usecase';
import PaymentPresenter from 'adapters/presenters/payment.presenter';

export default class PaymentController {
  private readonly _orderGateway = new OrderGateway(this._orderRepository);
  private readonly _paymentGateway = new PaymentGateway(this._paymentRepository)
  private readonly _paymentUseCase = new PaymentUseCase(
    this._orderGateway,
    this._paymentGateway,
    this._paymentProviderGateway
  );

  constructor(
    private _orderRepository: OrderRepository,
    private _paymentProviderGateway: PaymentProviderGateway,
    private _paymentRepository: PaymentRepository
  ) { }

  async confirmPaymentWebhook({ id: externalPaymentId, topic: messageType }: ConfirmPaymentDto): Promise<void> {
    if (messageType === 'payment') {
      await this._paymentUseCase.confirmPayment(externalPaymentId);
    }
  }

  async createPayment({ orderId }: CreatePaymentDto) {
    return PaymentPresenter.PresentCreatedOne(await this._paymentUseCase.createPayment(orderId));
  }
}
