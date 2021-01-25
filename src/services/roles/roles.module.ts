import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { DatabaseModule } from '../../database/database.module';
import { RolesRepository } from './roles.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';
import { CommonsModule } from '../../commons/commons.module';
import { UsersActsAsRolesModule } from '../users-acts-as-roles/users-acts-as-roles.module';
import { RolesIsAllowedScopesModule } from '../roles-is-allowed-scopes/roles-is-allowed-scopes.module';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    CommonsModule,
    forwardRef(() => UsersActsAsRolesModule),
    forwardRef(() => RolesIsAllowedScopesModule),
  ],
  providers: [RolesResolver, RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule {}
