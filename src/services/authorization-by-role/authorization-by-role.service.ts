import { Injectable } from '@nestjs/common';
import { CreateAuthorizationByRoleInput } from './dto/create-authorization-by-role.input';
import { UpdateAuthorizationByRoleInput } from './dto/update-authorization-by-role.input';
import { DocumentCollection } from 'arangojs/collection';
import { Connection } from '../../database/connection';
import { QueryParser } from '../../database/query-parser';
import { AuthorizationByRole } from './entities/authorization-by-role.entity';
import { aql } from 'arangojs';
import { FilterAuthorizationByRoleInput } from './dto/filter-authorization-by-role.input';
import { SortAuthorizationByRoleInput } from './dto/sort-authorization-by-role.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveAuthorizationByRoleInput } from './dto/remove-authorization-by-role.input';
import { FilterRoleInput } from '../roles/dto/filter-role.input';
import { SortRoleInput } from '../roles/dto/sort-role.input';
import { FilterUserInput } from '../users/dto/filter-user.input';
import { SortUserInput } from '../users/dto/sort-user.input';

@Injectable()
export class AuthorizationByRoleService {
  private collection: DocumentCollection;

  constructor(
    private connection: Connection,
    private queryParser: QueryParser,
  ) {
    this.collection = this.connection.collection<AuthorizationByRole[]>(
      'AuthorizationByRole',
    );
  }

  async create(
    documents: CreateAuthorizationByRoleInput[],
  ): Promise<AuthorizationByRole[]> {
    const trx = await this.connection.beginTransaction({
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
    filters?: FilterAuthorizationByRoleInput;
    sort?: SortAuthorizationByRoleInput;
    pagination?: PaginationInput;
  }): Promise<AuthorizationByRole[]> {
    const cursor = await this.connection.query(aql`
      FOR doc IN ${this.collection}
      ${aql.join(this.queryParser.filtersToAql(filters))}
      ${aql.join(this.queryParser.sortToAql(sort))}
      ${this.queryParser.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters?: FilterAuthorizationByRoleInput): Promise<number> {
    const cursor = await this.connection.query(aql`
      RETURN COUNT(
        FOR doc IN ${this.collection}
        ${aql.join(this.queryParser.filtersToAql(filters))}
        RETURN doc
      )
    `);

    const data = await cursor.map((el) => el);

    return data[0];
  }

  async findOne(_key: string): Promise<AuthorizationByRole | unknown> {
    const cursor = await this.connection.query(aql`
      FOR doc IN ${this.collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    const docs = await cursor.map((val) => val);

    return docs[0] || {};
  }

  async update(
    documents: UpdateAuthorizationByRoleInput[],
  ): Promise<AuthorizationByRole[]> {
    const trx = await this.connection.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(
    documents: RemoveAuthorizationByRoleInput[],
  ): Promise<AuthorizationByRole[]> {
    const trx = await this.connection.beginTransaction({
      write: [this.collection],
    });

    const docs = await trx.step(() =>
      this.connection.query(aql`
        FOR item IN ${documents}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this.collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docs.map((doc) => doc);
  }

  async outboundOneLevel({
    _id,
    filtersEdge,
    sortEdge,
    filtersVertex,
    sortVertex,
    pagination = { offset: 0, count: 10 },
  }: {
    _id: string;
    filtersEdge?: FilterAuthorizationByRoleInput;
    sortEdge?: SortAuthorizationByRoleInput;
    filtersVertex?: FilterRoleInput;
    sortVertex?: SortRoleInput;
    pagination?: PaginationInput;
  }): Promise<AuthorizationByRole[]> {
    const cursor = await this.connection.query(aql`
      FOR vertex, edge IN OUTBOUND ${_id} ${this.collection}
      ${aql.join(this.queryParser.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.queryParser.sortToAql(sortEdge, 'edge'))}
      ${aql.join(this.queryParser.filtersToAql(filtersVertex, 'vertex'))}
      ${aql.join(this.queryParser.sortToAql(sortVertex, 'vertex'))}
      ${this.queryParser.paginationToAql(pagination)}
      RETURN MERGE(edge, { _to: vertex })
    `);

    return await cursor.map((el) => el);
  }

  async inboundOneLevel({
    _id,
    filtersEdge,
    sortEdge,
    filtersVertex,
    sortVertex,
    pagination = { offset: 0, count: 10 },
  }: {
    _id: string;
    filtersEdge?: FilterAuthorizationByRoleInput;
    sortEdge?: SortAuthorizationByRoleInput;
    filtersVertex?: FilterUserInput;
    sortVertex?: SortUserInput;
    pagination?: PaginationInput;
  }): Promise<AuthorizationByRole[]> {
    const cursor = await this.connection.query(aql`
      FOR vertex, edge IN INBOUND ${_id} ${this.collection}
      ${aql.join(this.queryParser.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.queryParser.sortToAql(sortEdge, 'edge'))}
      ${aql.join(this.queryParser.filtersToAql(filtersVertex, 'vertex'))}
      ${aql.join(this.queryParser.sortToAql(sortVertex, 'vertex'))}
      ${this.queryParser.paginationToAql(pagination)}
      RETURN MERGE(edge, { _from: vertex })
    `);

    return await cursor.map((el) => el);
  }
}
