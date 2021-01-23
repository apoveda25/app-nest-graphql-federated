import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { ROLES_IS_ALLOWED_SCOPES_COLLECTION } from './roles-is-allowed-scopes.contants';
import { CreateRolesIsAllowedScopeInput } from './dto/create-roles-is-allowed-scope.input';
import { RolesIsAllowedScope } from './entities/roles-is-allowed-scope.entity';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { PaginationInput } from '../../commons/pagination.input';
import { UpdateRolesIsAllowedScopeInput } from './dto/update-roles-is-allowed-scope.input';
import { RemoveRolesIsAllowedScopeInput } from './dto/remove-roles-is-allowed-scope.input';
import { errorRolesIsAllowedScopesRemove } from './roles-is-allowed-scopes.exception';

@Injectable()
export class RolesIsAllowedScopesRepository {
  private _collection: DocumentCollection;

  constructor(
    private readonly arangodbService: ArangoDBService,
    private readonly objectToAQL: ObjectToAQL,
  ) {
    this._collection = this.arangodbService.collection(
      ROLES_IS_ALLOWED_SCOPES_COLLECTION,
    );
  }

  private getCollection(name: string) {
    return this.arangodbService.collection(name);
  }

  async create(
    documents: CreateRolesIsAllowedScopeInput[],
  ): Promise<RolesIsAllowedScope[]> {
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
  }): Promise<RolesIsAllowedScope[]> {
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
  }): Promise<RolesIsAllowedScope[]> {
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

  async findOne(_key: string): Promise<RolesIsAllowedScope | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, {});
  }

  async update(
    documents: UpdateRolesIsAllowedScopeInput[],
  ): Promise<RolesIsAllowedScope[]> {
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
    documents: RemoveRolesIsAllowedScopeInput[],
  ): Promise<RolesIsAllowedScope[]> {
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
      throw errorRolesIsAllowedScopesRemove;
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
