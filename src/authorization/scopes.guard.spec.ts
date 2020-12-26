import { ScopesGuard } from './scopes.guard';
import { Reflector } from '@nestjs/core';

describe('ScopesGuard', () => {
  it('should be defined', () => {
    expect(new ScopesGuard(new Reflector())).toBeDefined();
  });
});
