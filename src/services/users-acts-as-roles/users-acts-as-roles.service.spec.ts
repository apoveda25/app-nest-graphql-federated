import { Test, TestingModule } from '@nestjs/testing';
import { UsersActsAsRolesService } from './users-acts-as-roles.service';

describe('UsersActsAsRolesService', () => {
  let service: UsersActsAsRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersActsAsRolesService],
    }).compile();

    service = module.get<UsersActsAsRolesService>(UsersActsAsRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
