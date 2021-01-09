import { Module } from '@nestjs/common';
import { PermissionsGrantedService } from './permissions-granted.service';
import { PermissionsGrantedResolver } from './permissions-granted.resolver';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionsGrantedResolver, PermissionsGrantedService],
})
export class PermissionsGrantedModule {}
