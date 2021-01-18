import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { AuthorizationModule } from './authorization/authorization.module';
import { PermissionsGuard } from './authorization/permissions.guard';
import { FederationModule } from './federation/federation.module';
import { FederationConfigService } from './federation/federation-config.service';
import { UsersModule } from './services/users/users.module';
import { RolesModule } from './services/roles/roles.module';
import { ScopesModule } from './services/scopes/scopes.module';
import { AuthorizationByRoleModule } from './services/authorization-by-role/authorization-by-role.module';
import { PermissionsGrantedModule } from './services/permissions-granted/permissions-granted.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
      encoding: 'UTF-8',
      validate,
    }),
    GraphQLFederationModule.forRootAsync({
      useClass: FederationConfigService,
    }),
    UsersModule,
    AuthorizationModule,
    FederationModule,
    RolesModule,
    ScopesModule,
    AuthorizationByRoleModule,
    PermissionsGrantedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
