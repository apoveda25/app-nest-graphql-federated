import { Test, TestingModule } from '@nestjs/testing';
import { UsersActsAsRolesRepository } from './users-acts-as-roles.repository';

describe('UsersActsAsRolesRepository', () => {
  let provider: UsersActsAsRolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersActsAsRolesRepository],
    }).compile();

    provider = module.get<UsersActsAsRolesRepository>(UsersActsAsRolesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
