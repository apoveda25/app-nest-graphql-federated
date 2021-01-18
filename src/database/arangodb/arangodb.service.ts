import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import { IOptionsDatabase } from '../database.interfaces';

@Injectable()
export class ArangoDBService extends Database {
  constructor(@Inject('DATABASE_OPTIONS') private options: IOptionsDatabase) {
    super(options.arangodb);
  }
}
