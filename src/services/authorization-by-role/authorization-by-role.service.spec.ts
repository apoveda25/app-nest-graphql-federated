import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationByRoleService } from './authorization-by-role.service';

describe('AuthorizationByRoleService', () => {
  let service: AuthorizationByRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationByRoleService],
    }).compile();

    service = module.get<AuthorizationByRoleService>(AuthorizationByRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
