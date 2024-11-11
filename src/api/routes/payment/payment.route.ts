import { ConfirmPaymentSwaggerConfig } from '@api/config/swagger/payment/confirm-payment.swagger';
import ConfirmPaymentDto from '@api/dtos/payment/input/confirm-payment.dto';
import CreatePaymentDto from '@api/dtos/payment/input/create-payment.dto';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import PaymentRepository from '@datasource/typeorm/repositories/payment.repository';
import PaymentProviderGateway from '@gateways/payment-provider.gateway';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PaymentController from 'adapters/controllers/payment.controller';


@ApiTags('payments')
@Controller('payments')
export default class PaymentRoute {
  private readonly _paymentController: PaymentController =
    new PaymentController(this._orderRepository, this._paymentProviderGateway, this._paymentRepository);

  constructor(
    private _orderRepository: OrderRepository,
    private _paymentProviderGateway: PaymentProviderGateway,
    private _paymentRepository: PaymentRepository
  ) {}

  @Post('/confirm')
  @HttpCode(HttpStatus.OK)
  @ConfirmPaymentSwaggerConfig()
  async confirmPayment(@Query() confirmPaymentParams: ConfirmPaymentDto) {
    try {
      await this._paymentController.confirmPaymentWebhook(confirmPaymentParams);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    @Post()
    @HttpCode(HttpStatus.OK)
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        try {
            return await this._paymentController.createPayment(createPaymentDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
