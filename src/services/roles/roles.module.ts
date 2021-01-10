import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { DatabaseModule } from '../../database/database.module';
import { AuthorizationByRoleModule } from '../authorization-by-role/authorization-by-role.module';
import { PermissionsGrantedModule } from '../permissions-granted/permissions-granted.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthorizationByRoleModule),
    forwardRef(() => PermissionsGrantedModule),
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesResolver, RolesService],
})
export class RolesModule {}
