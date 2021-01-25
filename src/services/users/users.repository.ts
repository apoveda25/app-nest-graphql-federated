import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { User } from './entities/user.entity';
import { CreateUserHash } from './dto/create-user-hash';
import { PaginationInput } from '../../commons/pagination.input';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { USERS_REMOVE_MESSAGE_ERROR, USERS_COLLECTION } from './users.contants';
import { IFilterToAQL } from '../../database/arangodb/object-to-aql.interface';
import { ISortToAQL } from '../../database/arangodb/object-to-aql.interface';

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
    pagination,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<User[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc.deleted == false
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
        FILTER doc.deleted == false
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findAllOutbound({
    edgeCollection,
    fieldOfResolution,
    filtersVertexInit,
    sortVertexInit,
    filtersEdge,
    sortEdge,
    filtersVertexFinal,
    sortVertexFinal,
    pagination,
  }: {
    edgeCollection: string;
    fieldOfResolution: string;
    filtersVertexInit: IFilterToAQL[];
    sortVertexInit: ISortToAQL[];
    filtersEdge: IFilterToAQL[];
    sortEdge: ISortToAQL[];
    filtersVertexFinal: IFilterToAQL[];
    sortVertexFinal: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<User[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc.deleted == false
      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexInit, 'doc'))}

      FOR vertex, edge IN OUTBOUND doc._id ${this.getCollection(edgeCollection)}
      PRUNE edge.deleted == false
      FILTER edge.deleted == false && FILTER vertex.deleted == false

      ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.objectToAQL.sortToAql(sortEdge, 'edge'))}

      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal, 'vertex'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexFinal, 'vertex'))}

      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN MERGE(doc, {${aql.literal(
        fieldOfResolution,
      )}: MERGE(edge, { _from: doc, _to: vertex })})
    `);

    return await cursor.map((el) => el);
  }

  async countAllOutbound({
    edgeCollection,
    filtersVertexInit,
    filtersEdge,
    filtersVertexFinal,
  }: {
    edgeCollection: string;
    filtersVertexInit: IFilterToAQL[];
    filtersEdge: IFilterToAQL[];
    filtersVertexFinal: IFilterToAQL[];
  }): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        FILTER doc.deleted == false
        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit, 'doc'))}

        FOR vertex, edge IN OUTBOUND doc._id ${this.getCollection(
          edgeCollection,
        )}
        PRUNE edge.deleted == false
        FILTER edge.deleted == false && FILTER vertex.deleted == false

        ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}

        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal, 'vertex'))}

        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findOne(_key: string): Promise<User | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc.deleted == false
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
