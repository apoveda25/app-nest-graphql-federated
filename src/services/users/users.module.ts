import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../database/database.module';
import { AuthorizationByRoleModule } from '../authorization-by-role/authorization-by-role.module';
import { UsersRepository } from './users.repository';
import { ArangoDBConfig } from '../../config/arangodb.config';

@Module({
  imports: [
    DatabaseModule.forRootAsync({ useClass: ArangoDBConfig }),
    forwardRef(() => AuthorizationByRoleModule),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
