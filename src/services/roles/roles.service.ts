import { Injectable } from '@nestjs/common';
import { aql, Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { PaginationInput } from 'src/commons/pagination.input';
import { Connection } from '../../database/connection';
import { QueryParser } from '../../database/query-parser';
import { CreateRoleInput } from './dto/create-role.input';
import { FilterRoleInput } from './dto/filter-role.input';
import { RemoveRoleInput } from './dto/remove-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private db: Database;
  private collection: DocumentCollection;

  constructor(
    private connection: Connection,
    private queryParser: QueryParser,
  ) {
    this.db = this.connection.db;
    this.collection = this.db.collection<Role[]>('Roles');
  }

  async create(createRolesInput: CreateRoleInput[]) {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.saveAll(createRolesInput, {
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
    filters?: FilterRoleInput;
    sort?: SortRoleInput;
    pagination?: PaginationInput;
  }): Promise<Role[]> {
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

  async findOne(_key: string): Promise<Role | unknown> {
    const cursor = await this.db.query(aql`
      FOR doc IN ${this.collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    const docs = await cursor.map((val) => val);

    return docs[0] || {};
  }

  async update(updateRolesInput: UpdateRoleInput[]): Promise<Role[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.updateAll(updateRolesInput, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(removeRolesInput: RemoveRoleInput[]): Promise<Role[]> {
    const trx = await this.db.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.db.query(aql`
        FOR item IN ${removeRolesInput}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this.collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docs.map((doc) => doc);
  }
}
