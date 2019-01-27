import { Test, TestingModule } from '@nestjs/testing';
import { BwinController } from './bwin.controller';

describe('Bwin Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [BwinController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: BwinController = module.get<BwinController>(BwinController);
    expect(controller).toBeDefined();
  });
});
