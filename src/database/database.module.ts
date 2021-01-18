import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ArangoDBService } from './arangodb/arangodb.service';
import { DATABASE_OPTIONS } from './database.constants';
import { IOptionsDatabase } from './database.interfaces';
import { IOptionsDatabaseAsync } from './database.interfaces';
import { DatabaseOptionsFactory } from './database.interfaces';
import { ObjectToAQL } from './arangodb/object-to-aql';

@Module({})
export class DatabaseModule {
  static forRoot(options: IOptionsDatabase = { arangodb: {} }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        ObjectToAQL,
        ArangoDBService,
        {
          provide: DATABASE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ObjectToAQL, ArangoDBService],
    };
  }

  static forRootAsync(options: IOptionsDatabaseAsync): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports,
      providers: [
        ObjectToAQL,
        ArangoDBService,
        ...this.createAsyncProviders(options),
      ],
      exports: [ObjectToAQL, ArangoDBService],
    };
  }

  private static createAsyncProviders(
    options: IOptionsDatabaseAsync,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: IOptionsDatabaseAsync,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: DATABASE_OPTIONS,
        useFactory: async (...args: any[]) => await options.useFactory(...args),
        inject: options.inject || [],
      };
    }
    return {
      provide: DATABASE_OPTIONS,
      useFactory: async (optionsFactory: DatabaseOptionsFactory) =>
        await optionsFactory.createDatabaseOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
