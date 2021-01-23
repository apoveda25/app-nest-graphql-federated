import { Module } from '@nestjs/common';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';
import { RolesIsAllowedScopesResolver } from './roles-is-allowed-scopes.resolver';

@Module({
  providers: [RolesIsAllowedScopesResolver, RolesIsAllowedScopesService]
})
export class RolesIsAllowedScopesModule {}
