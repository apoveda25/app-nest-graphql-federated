import { forwardRef, Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';
import { DatabaseModule } from '../../database/database.module';
import { PermissionsGrantedModule } from '../permissions-granted/permissions-granted.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => PermissionsGrantedModule)],
  providers: [ScopesResolver, ScopesService],
  exports: [ScopesResolver, ScopesService],
})
export class ScopesModule {}
