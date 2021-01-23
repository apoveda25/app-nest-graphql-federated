import { Test, TestingModule } from '@nestjs/testing';
import { UsersActsAsRolesResolver } from './users-acts-as-roles.resolver';
import { UsersActsAsRolesService } from './users-acts-as-roles.service';

describe('UsersActsAsRolesResolver', () => {
  let resolver: UsersActsAsRolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersActsAsRolesResolver, UsersActsAsRolesService],
    }).compile();

    resolver = module.get<UsersActsAsRolesResolver>(UsersActsAsRolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
