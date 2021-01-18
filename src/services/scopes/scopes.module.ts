import { forwardRef, Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';
import { DatabaseModule } from '../../database/database.module';
import { PermissionsGrantedModule } from '../permissions-granted/permissions-granted.module';
import { ArangoDBConfig } from '../../config/arangodb.config';
import { ScopesRepository } from './scopes.repository';

@Module({
  imports: [
    DatabaseModule.forRootAsync({ useClass: ArangoDBConfig }),
    forwardRef(() => PermissionsGrantedModule),
  ],
  providers: [ScopesResolver, ScopesService, ScopesRepository],
  exports: [ScopesResolver, ScopesService],
})
export class ScopesModule {}
