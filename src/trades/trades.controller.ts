import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradeType } from './entities/trade.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@Controller('trades')
@ApiBearerAuth()
@ApiSecurity('api-key')
@UseGuards(JwtAuthGuard)
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.create(createTradeDto);
  }

  @Get()
  findAll(@Query('type') type?: TradeType, @Query('user_id') userId?: string) {
    return this.tradesService.findAll({ type, userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradesService.doNotAllow(+id);
  }

  @Put(':id')
  replace(@Param('id') id: string) {
    return this.tradesService.doNotAllow(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.tradesService.doNotAllow(+id);
  }
}
