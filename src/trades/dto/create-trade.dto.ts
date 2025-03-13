import { ApiProperty } from '@nestjs/swagger';
import { TradeType } from '../entities/trade.entity';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTradeDto {
  @ApiProperty({ enum: TradeType })
  @IsEnum(TradeType, { message: 'type must be either BUY or SELL' })
  type: TradeType;

  @ApiProperty({ name: 'user_id' })
  @Transform(({ value }) => Number(value))
  userId: number;

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
