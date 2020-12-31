import { Injectable } from '@nestjs/common';
import { aql, Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { Connection } from '../database/connection';
import { QueryParser } from '../database/query-parser';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';
import { Scope } from './entities/scope.entity';
import { FilterScopeInput } from './dto/filter-scope.input';
import { SortScopeInput } from './dto/sort-scope.input';
import { PaginationInput } from '../commons/pagination.input';
import { RemoveScopeInput } from './dto/remove-scope.input';

@Injectable()
export class ScopesService {
  private db: Database;
  private collection: DocumentCollection;

  constructor(
    private connection: Connection,
    private queryParser: QueryParser,
  ) {
    this.db = this.connection.db;
    this.collection = this.db.collection<Scope[]>('Scopes');
  }

  async create(createScopesInput: CreateScopeInput[]) {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.saveAll(createScopesInput, {
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
    filters?: FilterScopeInput;
    sort?: SortScopeInput;
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      ${aql.join(this.queryParser.filtersToAql(filters))}
      ${aql.join(this.queryParser.sortToAql(sort))}
      ${this.queryParser.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters): Promise<number> {
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

  async findOne(_key: string): Promise<Scope | unknown> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    const docs = await cursor.map((val) => val);

    return docs[0] || {};
  }

  async update(updateScopesInput: UpdateScopeInput[]): Promise<Scope[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.updateAll(updateScopesInput, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(removeScopesInput: RemoveScopeInput[]): Promise<Scope[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.db.query(aql`
        FOR item IN ${removeScopesInput}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this.collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docs.map((doc) => doc);
  }
}
