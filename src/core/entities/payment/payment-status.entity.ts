import PaymentStatusEnum from "@enums/payment-status.enum";

export default class PaymentStatusEntity {
    constructor(
      public readonly id: PaymentStatusEnum,
      public readonly name?: string,
      public readonly description?: string
    ) {}
  }
  