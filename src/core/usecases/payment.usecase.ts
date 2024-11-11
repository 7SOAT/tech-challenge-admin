
import PaymentStatusEnum from "@enums/payment-status.enum";
import PaymentProviderGateway from "@gateways/payment-provider.gateway";
import IOrderGateway from "@interfaces/datasource/order.gateway";
import IPaymentGateway from "@interfaces/datasource/payment.gateway";
import OrderStatusEnum from "core/enums/order-status.enum";
import { UUID } from "crypto";

export default class PaymentUseCase {
    constructor(
        private _orderGateway: IOrderGateway,
        private _paymentGateway: IPaymentGateway,
        private _paymentProviderGateway: PaymentProviderGateway
    ) {
    }

    async confirmPayment(externalPaymentId: number): Promise<void> {
        try {
            const {external_reference, status} = await this._paymentProviderGateway.findPaymentById(externalPaymentId);
            const orderId = <UUID> external_reference;
            
            const order = await this._orderGateway.findById(orderId);

            if (order) {
                let paymentStatus: PaymentStatusEnum;
                switch (status) {
                    case "approved":
                        paymentStatus = PaymentStatusEnum.APPROVED;
                        break;
                
                    case "rejected":
                        paymentStatus = PaymentStatusEnum.REJECTED;
                        break;
                    default:
                        break;
                }
                await this._paymentGateway.updatePaymentStatus(order.payment.id, paymentStatus);
                await this._orderGateway.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED);
            } else {
                throw Error("Order not found")
            }
        } catch (err) {
            throw Error(err);
        }
    }

    async createPayment(orderId: UUID): Promise<{ qr_data: string }> {
        try {
            const order = await this._orderGateway.findById(orderId);
            if (order) {
                const result = await this._paymentProviderGateway.createOrderPayment(order);
                await this._paymentGateway.updatePaymentStatus(order.payment?.id, PaymentStatusEnum.CREATED);
                return result;
            } else {
                throw Error("Order not found")
            }
        } catch (err) {
            throw Error(err);
        }
    }

}