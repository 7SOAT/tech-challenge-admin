import { PaymentStatusDto } from "@api/dtos/payment/output/payment-status.dto";
import { CreatePaymentDto, PaymentDto } from "@api/dtos/payment/output/payment.dto";
import PaymentEntity from "@entities/payment/payment.entity";

class PaymentPresenter {
  static PresentOne(payment: PaymentEntity): PaymentDto {
    return new PaymentDto(
      payment.id,
      new PaymentStatusDto(
        payment.status?.id,
        payment.status?.name,
        payment.status?.description
      ),
      payment.externalId
    );
  }

  static PresentCreatedOne({ qr_data }): CreatePaymentDto {
    return new CreatePaymentDto(qr_data);
  }
}

export default PaymentPresenter;
