import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsGrantedService } from './permissions-granted.service';

describe('PermissionsGrantedService', () => {
  let service: PermissionsGrantedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsGrantedService],
    }).compile();

    service = module.get<PermissionsGrantedService>(PermissionsGrantedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
