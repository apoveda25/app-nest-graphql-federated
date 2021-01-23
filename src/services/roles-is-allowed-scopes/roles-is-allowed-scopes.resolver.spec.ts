import { Test, TestingModule } from '@nestjs/testing';
import { RolesIsAllowedScopesResolver } from './roles-is-allowed-scopes.resolver';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';

describe('RolesIsAllowedScopesResolver', () => {
  let resolver: RolesIsAllowedScopesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesIsAllowedScopesResolver, RolesIsAllowedScopesService],
    }).compile();

    resolver = module.get<RolesIsAllowedScopesResolver>(RolesIsAllowedScopesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
