import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from '../../database/database.module';
import { AuthorizationByRoleModule } from '../authorization-by-role/authorization-by-role.module';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, forwardRef(() => AuthorizationByRoleModule)],
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await resolver.createUsers([])).toBe(result);
    });
  });
});
