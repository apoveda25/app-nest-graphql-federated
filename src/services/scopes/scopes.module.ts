import { forwardRef, Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';
import { DatabaseModule } from '../../database/database.module';
// import { PermissionsGrantedModule } from '../permissions-granted/permissions-granted.module';
import { ScopesRepository } from './scopes.repository';
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
    // forwardRef(() => PermissionsGrantedModule),
  ],
  providers: [ScopesResolver, ScopesService, ScopesRepository],
  exports: [ScopesResolver, ScopesService],
})
export class ScopesModule {}
