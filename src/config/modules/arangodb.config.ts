import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

export const arangodbConfig = (configService: ConfigService) => {
  return {
    arangodb: {
      url: configService.get('db.arangodb.urls'),
      databaseName: configService.get('db.arangodb.name'),
      auth: {
        username: configService.get('db.arangodb.username'),
        password: configService.get('db.arangodb.password'),
      },
      agentOptions: {
        ca: configService
          .get('db.arangodb.certs')
          .map((cert: string) => readFileSync(cert)),
      },
    },
  };
};
