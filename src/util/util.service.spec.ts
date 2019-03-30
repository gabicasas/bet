import { Test, TestingModule } from '@nestjs/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilService],
    }).compile();
    service = module.get<UtilService>(UtilService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
