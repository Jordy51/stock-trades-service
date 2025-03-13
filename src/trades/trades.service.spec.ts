import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from './trades.service';
import { TradeRepository } from './repositories/trade.repository';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { Trade, TradeType } from './entities/trade.entity';

describe('TradesService', () => {
  let service: TradesService;
  let tradeRepository: Partial<TradeRepository>;

  beforeEach(async () => {
    tradeRepository = {
      getTradeById: jest.fn(),
      createAndSave: jest.fn(),
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: TradeRepository,
          useValue: tradeRepository,
        },
      ],
    }).compile();

    service = module.get<TradesService>(TradesService);
    // tradeRepository = module.get<TradeRepository>(TradeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTradeIdOrThrow', () => {
    it('should return a trade if found', async () => {
      const trade: Trade = {
        id: 1,
        type: TradeType.BUY,
        userId: 123,
        symbol: 'ABC',
        shares: 23,
        price: 232,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(tradeRepository, 'getTradeById').mockResolvedValue(trade);

      await expect(service.findByTradeIdOrThrow(1)).resolves.toEqual(trade);
    });

    it('should throw NotFoundException if trade not found', async () => {
      jest.spyOn(tradeRepository, 'getTradeById').mockResolvedValue(null);

      await expect(service.findByTradeIdOrThrow(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a new trade', async () => {
      const createTradeDto: CreateTradeDto = {
        type: TradeType.BUY,
        userId: 123,
        symbol: 'ABC',
        shares: 23,
        price: 232,
      };

      const savedTrade = {
        ...createTradeDto,
        id: 1,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(tradeRepository, 'createAndSave')
        .mockResolvedValue(savedTrade);

      await expect(service.create(createTradeDto)).resolves.toEqual(savedTrade);
    });
  });

  describe('findAll', () => {
    it('should return all trades matching criteria', async () => {
      const trade: Trade = {
        id: 1,
        type: TradeType.BUY,
        userId: 123,
        symbol: 'ABC',
        shares: 23,
        price: 232,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const trades = [trade];
      jest.spyOn(tradeRepository, 'findAll').mockResolvedValue(trades);

      await expect(service.findAll({ userId: '123' })).resolves.toEqual(trades);
    });
  });

  describe('findOne', () => {
    it('should return a trade by ID', async () => {
      const trade: Trade = {
        id: 1,
        type: TradeType.BUY,
        userId: 123,
        symbol: 'ABC',
        shares: 23,
        price: 232,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findByTradeIdOrThrow').mockResolvedValue(trade);

      await expect(service.findOne(1)).resolves.toEqual(trade);
    });
  });

  describe('doNotAllow', () => {
    it('should throw HttpException', () => {
      expect(() => service.doNotAllow(1)).toThrow(HttpException);
      expect(() => service.doNotAllow(1)).toThrow(
        new HttpException(
          {
            message: 'Modification not allowed on trades',
            error: 'Method Not Allowed',
          },
          HttpStatus.METHOD_NOT_ALLOWED,
        ),
      );
    });
  });
});
