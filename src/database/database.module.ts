import { Module } from '@nestjs/common';
import { Connection } from './connection';
import { QueryParser } from './query-parser';

@Module({
  providers: [Connection, QueryParser],
  exports: [Connection, QueryParser],
})
export class DatabaseModule {}
