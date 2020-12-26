import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';
import { Database as DB } from 'arangojs/database';
import { readFileSync } from 'fs';

@Injectable()
export class Connection {
  readonly db: DB;

  constructor(private configService: ConfigService) {
    this.db = new Database({
      url: this.configService.get('db.arangodb.urls'),
      databaseName: this.configService.get('db.arangodb.name'),
      auth: {
        username: this.configService.get('db.arangodb.username'),
        password: this.configService.get('db.arangodb.password'),
      },
      agentOptions: {
        ca: this.configService
          .get('db.arangodb.certs')
          .map((cert) => readFileSync(cert)),
      },
    });
  }
}
