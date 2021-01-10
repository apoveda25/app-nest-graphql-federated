import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationByRoleService } from './authorization-by-role.service';
import { AuthorizationByRoleResolver } from './authorization-by-role.resolver';
import { DatabaseModule } from '../../database/database.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
  ],
  providers: [AuthorizationByRoleResolver, AuthorizationByRoleService],
  exports: [AuthorizationByRoleResolver, AuthorizationByRoleService],
})
export class AuthorizationByRoleModule {}
