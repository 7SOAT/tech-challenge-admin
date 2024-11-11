import { UUID } from 'crypto';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseModel from '@models/base.model';
import PaymentStatusModel from './payment-status.model';
import OrderStatusModel from '@models/order/order-status.model';
import OrderModel from '@models/order/order.model';

@Entity({ name: 'payment' })
export default class PaymentModel extends BaseModel<PaymentModel> {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column('numeric', { nullable: true})
    externalId?: number;

    @ManyToOne(() => PaymentStatusModel, (paymentStatus) => paymentStatus.id, { eager: true})
    @JoinTable()
    status: PaymentStatusModel

    @OneToOne(() => OrderModel)
    order: OrderModel
}
