import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PermissionsGuard } from './authorization/permissions.guard';
import { FederationModule } from './federation/federation.module';
import { FederationConfigService } from './federation/federation-config.service';
import { RolesModule } from './roles/roles.module';
import { ScopesModule } from './scopes/scopes.module';

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
    CommonsModule,
    DatabaseModule,
    AuthorizationModule,
    FederationModule,
    RolesModule,
    ScopesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
