import { Injectable } from '@nestjs/common';
import { DocumentCollection } from 'arangojs/collection';
import { ArangoDBService } from '../../database/arangodb/arangodb.service';
import { ObjectToAQL } from '../../database/arangodb/object-to-aql';
import { ROLES_COLLECTION } from './roles.contants';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './entities/role.entity';
import { PaginationInput } from '../../commons/pagination.input';
import { aql } from 'arangojs';
import { UpdateRoleInput } from './dto/update-role.input';
import { RemoveRoleInput } from './dto/remove-role.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';

@Injectable()
export class RolesRepository {
  private _collection: DocumentCollection;

  constructor(
    private readonly arangodbService: ArangoDBService,
    private readonly objectToAQL: ObjectToAQL,
  ) {
    this._collection = this.arangodbService.collection(ROLES_COLLECTION);
  }

  private getCollection(name: string) {
    return this.arangodbService.collection(name);
  }

  async create(documents: CreateRoleInput[]): Promise<Role[]> {
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
  }): Promise<Role[]> {
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
  }): Promise<Role[]> {
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

  async findOne(_key: string): Promise<Role | unknown> {
    const cursor = await this.arangodbService.query(aql`
      FOR doc IN ${this._collection}
      FILTER doc.deleted == false
      FILTER doc._key == ${_key} || doc._id == ${_key}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, {});
  }

  async update(documents: UpdateRoleInput[]): Promise<Role[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }

  async remove(documents: RemoveRoleInput[]): Promise<Role[]> {
    const trx = await this.arangodbService.beginTransaction({
      write: [this._collection],
    });

    const docs = await trx.step(() =>
      this._collection.updateAll(documents, { returnNew: true }),
    );

    await trx.commit();

    return docs.map((doc) => doc.new);
  }
}
