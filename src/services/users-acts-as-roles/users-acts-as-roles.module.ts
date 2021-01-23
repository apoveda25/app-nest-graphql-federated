import { Module } from '@nestjs/common';
import { UsersActsAsRolesService } from './users-acts-as-roles.service';
import { UsersActsAsRolesResolver } from './users-acts-as-roles.resolver';
import { UsersActsAsRolesRepository } from './users-acts-as-roles.repository';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';
import { CommonsModule } from '../../commons/commons.module';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    CommonsModule,
    // forwardRef(() => AuthorizationByRoleModule),
  ],
  providers: [
    UsersActsAsRolesResolver,
    UsersActsAsRolesService,
    UsersActsAsRolesRepository,
  ],
})
export class UsersActsAsRolesModule {}
