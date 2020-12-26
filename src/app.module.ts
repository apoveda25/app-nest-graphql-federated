import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import { validate } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ScopesGuard } from './authorization/scopes.guard';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
      encoding: 'UTF-8',
      validate,
    }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({
        user: {
          _id: req.headers['x-user-id'],
          scopes: req.headers['x-user-scopes']?.split(','),
        },
      }),
    }),
    UsersModule,
    CommonsModule,
    DatabaseModule,
    AuthorizationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,
    },
  ],
})
export class AppModule {}
