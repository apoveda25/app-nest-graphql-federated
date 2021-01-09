import { Injectable } from '@nestjs/common';
import { Database, aql } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { CreatePermissionsGrantedInput } from './dto/create-permissions-granted.input';
import { UpdatePermissionsGrantedInput } from './dto/update-permissions-granted.input';
import { Connection } from '../../database/connection';
import { QueryParser } from '../../database/query-parser';
import { PermissionsGranted } from './entities/permissions-granted.entity';
import { FilterPermissionsGrantedInput } from './dto/filter-permissions-granted.input';
import { SortPermissionsGrantedInput } from './dto/sort-permissions-granted.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemovePermissionsGrantedInput } from './dto/remove-permissions-granted.input';

@Injectable()
export class PermissionsGrantedService {
  private db: Database;
  private collection: DocumentCollection;

  constructor(
    private connection: Connection,
    private queryParser: QueryParser,
  ) {
    this.db = this.connection.db;
    this.collection = this.db.collection<PermissionsGranted[]>(
      'PermissionsGranted',
    );
  }

  async create(
    documents: CreatePermissionsGrantedInput[],
  ): Promise<PermissionsGranted[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.saveAll(documents, {
        returnNew: true,
      }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async findAll({
    filters,
    sort,
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: FilterPermissionsGrantedInput;
    sort?: SortPermissionsGrantedInput;
    pagination?: PaginationInput;
  }): Promise<PermissionsGranted[]> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      ${aql.join(this.queryParser.filtersToAql(filters))}
      ${aql.join(this.queryParser.sortToAql(sort))}
      ${this.queryParser.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters?: FilterPermissionsGrantedInput): Promise<number> {
    const cursor = await this.db.query(aql`
      RETURN COUNT(
        FOR doc IN ${this.collection}
        ${aql.join(this.queryParser.filtersToAql(filters))}
        RETURN doc
      )
    `);

    const data = await cursor.map((el) => el);

    return data[0];
  }

  async findOne(_key: string): Promise<PermissionsGranted | unknown> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    const docs = await cursor.map((val) => val);

    return docs[0] || {};
  }

  async update(
    documents: UpdatePermissionsGrantedInput[],
  ): Promise<PermissionsGranted[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(
    documents: RemovePermissionsGrantedInput[],
  ): Promise<PermissionsGranted[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.db.query(aql`
        FOR item IN ${documents}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this.collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docs.map((doc) => doc);
  }
}
