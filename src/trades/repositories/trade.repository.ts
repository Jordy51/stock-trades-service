import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Trade } from '../entities/trade.entity';

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
}
