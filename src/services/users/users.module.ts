import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../database/database.module';
import { AuthorizationByRoleModule } from '../authorization-by-role/authorization-by-role.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthorizationByRoleModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
