import { Injectable } from '@nestjs/common';
import { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { USERS_ACTS_AS_ROLES_COLLECTION } from './users-acts-as-roles.contants';
import { CreateUsersActsAsRoleInput } from './dto/create-users-acts-as-role.input';
import { UsersActsAsRole } from './entities/users-acts-as-role.entity';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { PaginationInput } from '../../commons/pagination.input';
import { aql } from 'arangojs/aql';
import { UpdateUsersActsAsRoleInput } from './dto/update-users-acts-as-role.input';
import { RemoveUsersActsAsRoleInput } from './dto/remove-users-acts-as-role.input';
import { errorUsersActsAsRolesRemove } from './users-acts-as-roles.exception';

@Injectable()
export class UsersActsAsRolesRepository {
  private _collection: DocumentCollection;

  constructor(
    private readonly arangodbService: ArangoDBService,
    private readonly objectToAQL: ObjectToAQL,
  ) {
    this._collection = this.arangodbService.collection(
      USERS_ACTS_AS_ROLES_COLLECTION,
    );
  }

  private getCollection(name: string) {
    return this.arangodbService.collection(name);
  }

  async create(
    documents: CreateUsersActsAsRoleInput[],
  ): Promise<UsersActsAsRole[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.saveAll(documents, {
        returnNew: true,
      }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async findAll({
    filters,
    sort,
    pagination,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters: IFilterToAQL[]): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async searchAllOutbound({
    startVertexId,
    filtersEdge,
    sortEdge,
    filtersVertex,
    sortVertex,
    pagination,
  }: {
    startVertexId: string;
    filtersEdge: IFilterToAQL[];
    sortEdge: ISortToAQL[];
    filtersVertex: IFilterToAQL[];
    sortVertex: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR vertex, edge IN OUTBOUND ${startVertexId} ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.objectToAQL.sortToAql(sortEdge, 'edge'))}

      ${aql.join(this.objectToAQL.filtersToAql(filtersVertex, 'vertex'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertex, 'vertex'))}

      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN MERGE(edge, { _from: DOCUMENT(${startVertexId}), _to: vertex })
    `);

    return await cursor.map((el) => el);
  }

  async searchAllInbound({
    startVertexId,
    filtersEdge,
    sortEdge,
    filtersVertex,
    sortVertex,
    pagination,
  }: {
    startVertexId: string;
    filtersEdge: IFilterToAQL[];
    sortEdge: ISortToAQL[];
    filtersVertex: IFilterToAQL[];
    sortVertex: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR vertex, edge IN INBOUND ${startVertexId} ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.objectToAQL.sortToAql(sortEdge, 'edge'))}

      ${aql.join(this.objectToAQL.filtersToAql(filtersVertex, 'vertex'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertex, 'vertex'))}

      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN MERGE(edge, { _from: vertex, _to: DOCUMENT(${startVertexId}) })
    `);

    return await cursor.map((el) => el);
  }

  async countAllOutbound({
    startVertexId,
    filtersEdge,
    filtersVertex,
  }: {
    startVertexId: string;
    filtersEdge: IFilterToAQL[];
    filtersVertex: IFilterToAQL[];
  }): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      COUNT(
        FOR vertex, edge IN OUTBOUND ${startVertexId} ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}

        ${aql.join(this.objectToAQL.filtersToAql(filtersVertex, 'vertex'))}

        RETURN vertex
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async countAllInbound({
    startVertexId,
    filtersEdge,
    filtersVertex,
  }: {
    startVertexId: string;
    filtersEdge: IFilterToAQL[];
    filtersVertex: IFilterToAQL[];
  }): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      COUNT(
        FOR vertex, edge IN INBOUND ${startVertexId} ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}

        ${aql.join(this.objectToAQL.filtersToAql(filtersVertex, 'vertex'))}

        RETURN vertex
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findOne(_key: string): Promise<UsersActsAsRole | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc.deleted == false
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, {});
  }

  async update(
    documents: UpdateUsersActsAsRoleInput[],
  ): Promise<UsersActsAsRole[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(
    documents: RemoveUsersActsAsRoleInput[],
  ): Promise<UsersActsAsRole[]> {
    const AuthorizationByRole = this.getCollection('AuthorizationByRole');
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
      read: [this._collection, AuthorizationByRole],
    });

    const docs = await trx.step(() =>
      this.arangodbService.query(aql`
        FOR vertex, edge IN ANY ${AuthorizationByRole}
        RETURN vertex
      `),
    );

    if (docs.reduce((acc: number, crr: number) => crr ?? acc + 1, 0)) {
      await trx.abort();
      throw errorUsersActsAsRolesRemove;
    }

    const docsOld = await trx.step(() =>
      this.arangodbService.query(aql`
        FOR item IN ${documents}
        LET doc = DOCUMENT(item._id)
        REMOVE doc IN ${this._collection}
        RETURN OLD
      `),
    );

    await trx.commit();

    return docsOld.map((doc) => doc);
  }
}
