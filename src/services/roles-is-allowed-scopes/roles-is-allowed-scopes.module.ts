import { Module } from '@nestjs/common';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';
import { RolesIsAllowedScopesResolver } from './roles-is-allowed-scopes.resolver';
import { RolesIsAllowedScopesRepository } from './roles-is-allowed-scopes.repository';
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
    RolesIsAllowedScopesResolver,
    RolesIsAllowedScopesService,
    RolesIsAllowedScopesRepository,
  ],
})
export class RolesIsAllowedScopesModule {}
