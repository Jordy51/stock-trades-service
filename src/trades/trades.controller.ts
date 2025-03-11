import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.create(createTradeDto);
  }

  @Get()
  findAll() {
    return this.tradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradesService.remove(id);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() replaceTradeDto: CreateTradeDto) {
    return this.tradesService.update(id, replaceTradeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(id, updateTradeDto);
  }
}
