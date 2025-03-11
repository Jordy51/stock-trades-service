import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Injectable()
export class TradesService {
  create(createTradeDto: CreateTradeDto) {
    return 'This action adds a new trade';
  }

  findAll() {
    return `This action returns all trades`;
  }

  findOne(id: string) {
    return `This action returns a #${id} trade`;
  }

  update(id: string, updateTradeDto: UpdateTradeDto) {
    return `This action updates a #${id} trade`;
  }

  remove(id: string) {
    return `This action removes a #${id} trade`;
  }
}
