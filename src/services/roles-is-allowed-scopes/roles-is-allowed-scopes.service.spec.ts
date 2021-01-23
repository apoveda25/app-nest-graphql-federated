import { Test, TestingModule } from '@nestjs/testing';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';

describe('RolesIsAllowedScopesService', () => {
  let service: RolesIsAllowedScopesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesIsAllowedScopesService],
    }).compile();

    service = module.get<RolesIsAllowedScopesService>(RolesIsAllowedScopesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
