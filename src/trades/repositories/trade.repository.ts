import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Trade, TradeType } from '../entities/trade.entity';

@Injectable()
export class TradeRepository extends Repository<Trade> {
  constructor(private dataSource: DataSource) {
    super(Trade, dataSource.createEntityManager());
  }

  async createAndSave(tradeData: Partial<Trade>): Promise<Trade> {
    const trade = this.create(tradeData);
    return this.save(trade);
  }

  async getTradeById(tradeId: number): Promise<Trade | null> {
    return this.findOne({ where: { id: tradeId } });
  }

  findAll(filter?: { type?: TradeType; userId?: string }) {
    const query = this.createQueryBuilder('trade');

    if (filter?.type) {
      query.andWhere('trade.type = :type', { type: filter.type });
    }

    if (filter?.userId) {
      query.andWhere('trade.userId = :userId', { userId: filter.userId });
    }

    return query.orderBy('trade.id', 'ASC').getMany();
  }
}
