import { Test, TestingModule } from '@nestjs/testing';
import { InsurancepolicesService } from './insurancepolices.service';

describe('InsurancepolicesService', () => {
  let service: InsurancepolicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsurancepolicesService],
    }).compile();

    service = module.get<InsurancepolicesService>(InsurancepolicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
