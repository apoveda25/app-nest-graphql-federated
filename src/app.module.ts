import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import { validate } from './config/validation';
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
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({
        userId: req.headers['x-user-id'],
        scopes: req.headers['x-user-scopes'],
      }),
    }),
    UsersModule,
    CommonsModule,
  ],
})
export class AppModule {}
