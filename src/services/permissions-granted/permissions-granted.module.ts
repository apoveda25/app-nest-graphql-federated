import { forwardRef, Module } from '@nestjs/common';
import { PermissionsGrantedService } from './permissions-granted.service';
import { PermissionsGrantedResolver } from './permissions-granted.resolver';
import { DatabaseModule } from '../../database/database.module';
import { RolesModule } from '../roles/roles.module';
import { ScopesModule } from '../scopes/scopes.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => RolesModule),
    forwardRef(() => ScopesModule),
  ],
  providers: [PermissionsGrantedResolver, PermissionsGrantedService],
  exports: [PermissionsGrantedResolver, PermissionsGrantedService],
})
export class PermissionsGrantedModule {}
