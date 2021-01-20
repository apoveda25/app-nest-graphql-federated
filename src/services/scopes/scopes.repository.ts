import { Injectable } from '@nestjs/common';
import { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { CreateScopeInput } from './dto/create-scope.input';
import { Scope } from './entities/scope.entity';
import { PaginationInput } from '../../commons/pagination.input';
import {
  SCOPES_REMOVE_MESSAGE_ERROR,
  SCOPES_COLLECTION,
} from './scopes.contants';
import { aql } from 'arangojs';
import { UpdateScopeInput } from './dto/update-scope.input';
import { RemoveScopeInput } from './dto/remove-scope.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';

@Injectable()
export class ScopesRepository {
  private _collection: DocumentCollection;

  constructor(
    private readonly arangodbService: ArangoDBService,
    private readonly objectToAQL: ObjectToAQL,
  ) {
    this._collection = this.arangodbService.collection(SCOPES_COLLECTION);
  }

  private getCollection(name: string) {
    return this.arangodbService.collection(name);
  }

  async create(documents: CreateScopeInput[]): Promise<Scope[]> {
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
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async countAll(filters?: IFilterToAQL[]): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findAllTransversal({
    edgeCollection,
    direction,
    filtersVertexInit,
    sortVertexInit,
    filtersEdge,
    sortEdge,
    filtersVertexFinal,
    sortVertexFinal,
    pagination = { offset: 0, count: 10 },
  }: {
    edgeCollection: string;
    direction: string;
    filtersVertexInit?: IFilterToAQL[];
    sortVertexInit?: ISortToAQL[];
    filtersEdge?: IFilterToAQL[];
    sortEdge?: ISortToAQL[];
    filtersVertexFinal?: IFilterToAQL[];
    sortVertexFinal?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexInit, 'doc'))}

      FOR vertex, edge IN ${direction} doc._id ${this.getCollection(
      edgeCollection,
    )}
      ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}
      ${aql.join(this.objectToAQL.sortToAql(sortEdge, 'edge'))}

      ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal, 'vertex'))}
      ${aql.join(this.objectToAQL.sortToAql(sortVertexFinal, 'vertex'))}

      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN MERGE(doc, {${aql.literal(
        edgeCollection,
      )}: MERGE(edge, { _from: doc, _to: vertex })})
    `);

    return await cursor.map((el) => el);
  }

  async countAllTransversal({
    edgeCollection,
    direction,
    filtersVertexInit,
    filtersEdge,
    filtersVertexFinal,
  }: {
    edgeCollection: string;
    direction: string;
    filtersVertexInit?: IFilterToAQL[];
    filtersEdge?: IFilterToAQL[];
    filtersVertexFinal?: IFilterToAQL[];
  }): Promise<number> {
    const cursor = await this.arangodbService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this._collection}
        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexInit, 'doc'))}

        FOR vertex, edge IN ${direction} doc._id ${this.getCollection(
      edgeCollection,
    )}
        ${aql.join(this.objectToAQL.filtersToAql(filtersEdge, 'edge'))}

        ${aql.join(this.objectToAQL.filtersToAql(filtersVertexFinal, 'vertex'))}

        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }

  async findOne(_key: string): Promise<Scope | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, {});
  }

  async update(documents: UpdateScopeInput[]): Promise<Scope[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  // async remove(documents: RemoveScopeInput[]): Promise<Scope[]> {
  //   const PermissionsGranted = this.getCollection('PermissionsGranted');
  //   const trx = await this.arangodbService.beginTransaction({
  //     write: [this._collection],
  //     read: [this._collection, PermissionsGranted],
  //   });

  //   const docs = await trx.step(() =>
  //     this.arangodbService.query(aql`
  //       FOR vertex, edge IN ANY ${PermissionsGranted}
  //       RETURN vertex
  //     `),
  //   );

  //   if (docs.reduce((acc: number, crr: number) => crr ?? acc + 1, 0)) {
  //     await trx.abort();
  //     throw new Error(SCOPES_REMOVE_MESSAGE_ERROR);
  //   }

  //   const docsOld = await trx.step(() =>
  //     this.arangodbService.query(aql`
  //       FOR item IN ${documents}
  //       LET doc = DOCUMENT(item._id)
  //       REMOVE doc IN ${this._collection}
  //       RETURN OLD
  //     `),
  //   );

  //   await trx.commit();

  //   return docsOld.map((doc) => doc);
  // }
}
