import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsGrantedResolver } from './permissions-granted.resolver';
import { PermissionsGrantedService } from './permissions-granted.service';

describe('PermissionsGrantedResolver', () => {
  let resolver: PermissionsGrantedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsGrantedResolver, PermissionsGrantedService],
    }).compile();

    resolver = module.get<PermissionsGrantedResolver>(PermissionsGrantedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
