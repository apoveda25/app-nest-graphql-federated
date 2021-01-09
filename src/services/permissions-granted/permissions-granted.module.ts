import { Module } from '@nestjs/common';
import { PermissionsGrantedService } from './permissions-granted.service';
import { PermissionsGrantedResolver } from './permissions-granted.resolver';

@Module({
  providers: [PermissionsGrantedResolver, PermissionsGrantedService]
})
export class PermissionsGrantedModule {}
