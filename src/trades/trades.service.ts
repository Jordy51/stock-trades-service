import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeRepository } from './repositories/trade.repository';
import { TradeType } from './entities/trade.entity';

@Injectable()
export class TradesService {
  constructor(private readonly tradeRepository: TradeRepository) {}

  async findByTradeIdOrThrow(tradeId: number) {
    const trade = await this.tradeRepository.getTradeById(tradeId);
    if (trade == null) {
      throw new NotFoundException(`Trade with id ${tradeId} not found`);
    }
    return trade;
  }

  async create(createTradeDto: CreateTradeDto) {
    const timestamp = new Date();
    const savedOrder = await this.tradeRepository.createAndSave({
      ...createTradeDto,
      timestamp,
    });
    return savedOrder;
  }

  findAll(ctx: { type?: TradeType; userId?: string }) {
    return `This action returns all trades`;
  }

  findOne(id: number) {
    return this.findByTradeIdOrThrow(id);
  }

  doNotAllow(id: number) {
    throw new HttpException(
      {
        message: 'Modification not allowed on trades',
        error: 'Method Not Allowed',
      },
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
