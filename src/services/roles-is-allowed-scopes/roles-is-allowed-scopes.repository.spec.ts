import { Test, TestingModule } from '@nestjs/testing';
import { RolesIsAllowedScopesRepository } from './roles-is-allowed-scopes.repository';

describe('RolesIsAllowedScopesRepository', () => {
  let provider: RolesIsAllowedScopesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesIsAllowedScopesRepository],
    }).compile();

    provider = module.get<RolesIsAllowedScopesRepository>(RolesIsAllowedScopesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
