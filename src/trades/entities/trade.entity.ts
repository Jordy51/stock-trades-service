import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL',
}
@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  type: TradeType;

  @Column()
  userId: number;

  @Column({ type: 'text' })
  symbol: string;

  @Column()
  shares: number;

  @Column('float')
  price: number;

  @Column({ type: 'datetime' })
  timestamp: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
