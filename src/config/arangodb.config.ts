import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import {
  DatabaseOptionsFactory,
  IOptionsDatabase,
} from '../database/database.interfaces';

export class ArangoDBConfig implements DatabaseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createDatabaseOptions(): Promise<IOptionsDatabase> | IOptionsDatabase {
    return {
      arangodb: {
        url: this.configService.get('db.arangodb.urls'),
        databaseName: this.configService.get('db.arangodb.name'),
        auth: {
          username: this.configService.get('db.arangodb.username'),
          password: this.configService.get('db.arangodb.password'),
        },
        agentOptions: {
          ca: this.configService
            .get('db.arangodb.certs')
            .map((cert: string) => readFileSync(cert)),
        },
      },
    };
  }
}
