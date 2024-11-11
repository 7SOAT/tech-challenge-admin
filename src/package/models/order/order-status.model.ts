import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'orderStatus' })
export default class OrderStatusModel {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'int2', unique: true, select: false })
  priorityOrder: number;

  constructor(partial: Partial<OrderStatusModel>) {
    Object.assign(this, partial);
  }
}
