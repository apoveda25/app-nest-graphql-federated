import { Test, TestingModule } from '@nestjs/testing';
import { FederationConfigService } from './federation-config.service';

describe('FederationConfigService', () => {
  let service: FederationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FederationConfigService],
    }).compile();

    service = module.get<FederationConfigService>(FederationConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
