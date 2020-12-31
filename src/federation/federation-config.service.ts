import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class FederationConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      sortSchema: true,
      context: ({ req }) => ({
        user: {
          _id: req.headers['x-user-id'],
          scopes: req.headers['x-user-scopes']?.split(','),
        },
      }),
    };
  }
}
