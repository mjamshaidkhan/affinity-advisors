import { Test, TestingModule } from '@nestjs/testing';
import { InsurancepolicesController } from './insurancepolices.controller';

describe('InsurancepolicesController', () => {
  let controller: InsurancepolicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsurancepolicesController],
    }).compile();

    controller = module.get<InsurancepolicesController>(InsurancepolicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
