import { ApiProperty } from '@nestjs/swagger';
import { TradeType } from '../entities/trade.entity';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

export class CreateTradeDto {
  @ApiProperty({ enum: TradeType })
  @IsEnum(TradeType, { message: 'type must be either BUY or SELL' })
  type: TradeType;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  shares: number;

  @ApiProperty()
  price: number;
}
