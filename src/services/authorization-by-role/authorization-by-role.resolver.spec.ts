import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationByRoleResolver } from './authorization-by-role.resolver';
import { AuthorizationByRoleService } from './authorization-by-role.service';

describe('AuthorizationByRoleResolver', () => {
  let resolver: AuthorizationByRoleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationByRoleResolver, AuthorizationByRoleService],
    }).compile();

    resolver = module.get<AuthorizationByRoleResolver>(AuthorizationByRoleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
