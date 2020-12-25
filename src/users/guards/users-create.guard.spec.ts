import { UsersCreateGuard } from './users-create.guard';

describe('UsersCreateGuard', () => {
  it('should be defined', () => {
    expect(new UsersCreateGuard()).toBeDefined();
  });
});
