import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database as ArangoDB } from 'arangojs';
import { readFileSync } from 'fs';

@Injectable()
export class Connection extends ArangoDB {
  constructor(configService: ConfigService) {
    super({
      url: configService.get('db.arangodb.urls'),
      databaseName: configService.get('db.arangodb.name'),
      auth: {
        username: configService.get('db.arangodb.username'),
        password: configService.get('db.arangodb.password'),
      },
      agentOptions: {
        ca: configService
          .get('db.arangodb.certs')
          .map((cert) => readFileSync(cert)),
      },
    });
  }
}
