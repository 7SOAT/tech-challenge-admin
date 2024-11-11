import { randomUUID, UUID } from 'crypto';
import PaymentStatusEntity from './payment-status.entity';
import OrderEntity from '@entities/order/order.entity';

export default class PaymentEntity {
  public readonly _order: OrderEntity;
  constructor(
    public readonly status: PaymentStatusEntity,
    public readonly externalId?: number,
    public readonly id: UUID = randomUUID(),
    public readonly order?: OrderEntity
  ) {
    this._order = order ?? this._order;
  }
}
