import { Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesResolver } from './scopes.resolver';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ScopesResolver, ScopesService],
})
export class ScopesModule {}
