import { Module } from '@nestjs/common';
import { AuthorizationByRoleService } from './authorization-by-role.service';
import { AuthorizationByRoleResolver } from './authorization-by-role.resolver';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AuthorizationByRoleResolver, AuthorizationByRoleService],
})
export class AuthorizationByRoleModule {}
