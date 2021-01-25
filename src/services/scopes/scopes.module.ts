import { forwardRef, Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';
import { DatabaseModule } from '../../database/database.module';
import { ScopesRepository } from './scopes.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';
import { CommonsModule } from '../../commons/commons.module';
import { RolesIsAllowedScopesModule } from '../roles-is-allowed-scopes/roles-is-allowed-scopes.module';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    CommonsModule,
    forwardRef(() => RolesIsAllowedScopesModule),
  ],
  providers: [ScopesResolver, ScopesService, ScopesRepository],
  exports: [ScopesService],
})
export class ScopesModule {}
