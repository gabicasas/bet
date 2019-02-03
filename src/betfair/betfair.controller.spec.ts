import { Test, TestingModule } from '@nestjs/testing';
import { BetfairController } from './betfair.controller';

describe('Betfair Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [BetfairController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: BetfairController = module.get<BetfairController>(BetfairController);
    expect(controller).toBeDefined();
  });
});
