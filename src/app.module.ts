import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import load from './config/load.config';
import { validate } from './config/validate.config';
import { AuthorizationModule } from './authorization/authorization.module';
import { PermissionsGuard } from './authorization/permissions.guard';
import { UsersModule } from './services/users/users.module';
import { RolesModule } from './services/roles/roles.module';
import { ScopesModule } from './services/scopes/scopes.module';
// import { AuthorizationByRoleModule } from './services/authorization-by-role/authorization-by-role.module';
// import { PermissionsGrantedModule } from './services/permissions-granted/permissions-granted.module';
import { graphqlConfig } from './config/modules/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [load],
      encoding: 'UTF-8',
      validate,
    }),
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: graphqlConfig,
    }),
    UsersModule,
    AuthorizationModule,
    RolesModule,
    ScopesModule,
    // AuthorizationByRoleModule,
    // PermissionsGrantedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
