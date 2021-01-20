import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import load from './config/load.config';
import { validate } from './config/validate.config';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './services/users/users.module';
import { RolesModule } from './services/roles/roles.module';
import { ScopesModule } from './services/scopes/scopes.module';
import { graphqlConfig } from './config/modules/graphql.config';
import { AuthorizationGuard } from './authorization/authorization.guard';

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
    AuthorizationModule,
    UsersModule,
    RolesModule,
    ScopesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
