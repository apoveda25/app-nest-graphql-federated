import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import type { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { User } from './entities/user.entity';
import { CreateUserHash } from './dto/create-user-hash';
import { FilterUserInput } from './dto/filter-user.input';
import { SortUserInput } from './dto/sort-user.input';
import { PaginationInput } from '../../commons/pagination.input';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { FilterRoleInput } from '../roles/dto/filter-role.input';
import { SortRoleInput } from '../roles/dto/sort-role.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { USERS_REMOVE_MESSAGE_ERROR, USERS_COLLECTION } from './users.contants';

@Injectable()
export class UsersRepository {
  private _collection: DocumentCollection;

  constructor(
    private readonly arangodbService: ArangoDBService,
    private readonly objectToAQL: ObjectToAQL,
  ) {
    this._collection = this.arangodbService.collection(USERS_COLLECTION);
  }

  private getCollection(name: string) {
    return this.arangodbService.collection(name);
  }

  async create(documents: CreateUserHash[]): Promise<User[]> {
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
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: FilterUserInput;
    sort?: SortUserInput;
    pagination?: PaginationInput;
  }): Promise<User[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filters))}
      ${aql.join(this.objectToAQL.sortToAql(sort))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters?: FilterUserInput): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filters))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findAllTransversal({
    edgeCollection,
    filtersVertexInit,
    sortVertexInit,
    filtersVertexFinal,
    sortVertexFinal,
    pagination = { offset: 0, count: 10 },
  }: {
    edgeCollection: string;
    filtersVertexInit?: FilterUserInput;
    sortVertexInit?: SortUserInput;
    filtersVertexFinal?: FilterRoleInput;
    sortVertexFinal?: SortRoleInput;
    pagination?: PaginationInput;
  }): Promise<User[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexInit))}

      FOR vertex, edge IN OUTBOUND doc._id ${this.getCollection(edgeCollection)}
      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexFinal))}

      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN MERGE(doc, {${aql.literal(
        edgeCollection,
      )}: MERGE(edge, { _from: doc, _to: vertex })})
    `);

    return await cursor.map((el) => el);
  }

  async countAllTransversal({
    edgeCollection,
    filtersVertexInit,
    filtersVertexFinal,
  }: {
    edgeCollection: string;
    filtersVertexInit?: FilterUserInput;
    filtersVertexFinal?: FilterRoleInput;
  }): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit))}

        FOR vertex, edge IN OUTBOUND doc._id ${this.getCollection(
          edgeCollection,
        )}
        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal))}

        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findOne(_key: string): Promise<User | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, {});
  }

  async update(documents: UpdateUserInput[]): Promise<User[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(documents: RemoveUserInput[]): Promise<User[]> {
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
      throw new Error(USERS_REMOVE_MESSAGE_ERROR);
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
