import { Injectable } from '@nestjs/common';
import { Database } from 'arangojs/database';
import { aql } from 'arangojs/aql';
import type { DocumentCollection } from 'arangojs/collection';
import { FilterUserInput } from './dto/filter-user.input';
import { SortUserInput } from './dto/sort-user.input';
import { PaginationInput } from '../commons/pagination.input';
import { CreateUserHash } from './dto/create-user-hash';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { User } from './entities/user.entity';
import { Connection } from '../database/connection';
import { QueryParser } from '../database/query-parser';

@Injectable()
export class UsersService {
  private db: Database;
  private collection: DocumentCollection;

  constructor(
    private connection: Connection,
    private queryParser: QueryParser,
  ) {
    this.db = this.connection.db;
    this.collection = this.db.collection<User[]>('Users');
  }

  public async create(createUsersInput: CreateUserHash[]): Promise<User[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.saveAll(createUsersInput, {
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
    filters?: FilterUserInput;
    sort?: SortUserInput;
    pagination?: PaginationInput;
  }): Promise<User[]> {
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

  async findOne(_key: string): Promise<User | unknown> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    const docs = await cursor.map((val) => val);

    return docs[0] || {};
  }

  async update(updateUsersInput: UpdateUserInput[]): Promise<User[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.updateAll(updateUsersInput, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(removeUsersInput: RemoveUserInput[]): Promise<User[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.db.query(aql`
        FOR item IN ${removeUsersInput}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this.collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docs.map((doc) => doc);
  }
}
