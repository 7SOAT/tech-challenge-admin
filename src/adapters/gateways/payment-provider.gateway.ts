import { HttpService } from "@nestjs/axios";
import { Inject } from "@nestjs/common";
import PaymentConfig from "@interfaces/config/mercado-pago.config";
import EnvironmentConfigService from "api/config/environment-config/environment-config.service";
import OrderEntity from "core/entities/order/order.entity";
import PaymentProvider from "@providers/mercado-pago/mercado-pago.provider";
import OrderItemDto from "@providers/mercado-pago/dto/request/create-order-item.dto";
import { CreateOrderPaymentDto } from "@providers/mercado-pago/dto/request/create-order-request.dto";
import PaymentEntity from "@entities/payment/payment.entity";

export default class PaymentProviderGateway {
    constructor(
        @Inject(EnvironmentConfigService)
        private readonly _paymentConfig: PaymentConfig,

        @Inject(PaymentProvider)
        private readonly _paymentProvider: PaymentProvider
    ) { }

    async createOrderPayment(order: OrderEntity): Promise<{ qr_data: string }> {
        const products: OrderItemDto[] = order.products.map((product) => new OrderItemDto(
            product.id.toString(),
            product.category,
            product.name,
            product.description,
            product.price
        ));

        const request = new CreateOrderPaymentDto(
            `Pedido ${order.orderNumber}`,
            order.totalValue,
            order.id,
            products,
            { id: parseInt(this._paymentConfig.getPaymentSponsorUserId().toString()) },
            { amount: 0 },
            "Description",
            this._paymentConfig.getPaymentNotificationUrl()
        );
        return await this._paymentProvider.createOrderPayment(request);
    }

    async findPaymentById(externalPaymentId: number): Promise<{external_reference, status}> {
        try {
            const result = await this._paymentProvider.findPaymentById(externalPaymentId)
            return result;
        } catch (err) {
            throw Error(err);
        }
    }
}