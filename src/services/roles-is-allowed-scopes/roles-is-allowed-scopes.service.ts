import { Injectable } from '@nestjs/common';
import { CreateRolesIsAllowedScopeInput } from './dto/create-roles-is-allowed-scope.input';
import { UpdateRolesIsAllowedScopeInput } from './dto/update-roles-is-allowed-scope.input';
import { RolesIsAllowedScopesRepository } from './roles-is-allowed-scopes.repository';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { PaginationInput } from '../../commons/pagination.input';
import { RolesIsAllowedScope } from './entities/roles-is-allowed-scope.entity';
import { RemoveRolesIsAllowedScopeInput } from './dto/remove-roles-is-allowed-scope.input';

@Injectable()
export class RolesIsAllowedScopesService {
  constructor(private readonly repository: RolesIsAllowedScopesRepository) {}

  async create(documents: CreateRolesIsAllowedScopeInput[]) {
    return this.repository.create(documents);
  }

  async findAll({
    filters,
    sort,
    pagination,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<RolesIsAllowedScope[]> {
    return this.repository.findAll({ filters, sort, pagination });
  }

  async countAll(filters: IFilterToAQL[]): Promise<number> {
    return this.repository.countAll(filters);
  }

  async findOne(_key: string): Promise<RolesIsAllowedScope | unknown> {
    return this.repository.findOne(_key);
  }

  async update(
    documents: UpdateRolesIsAllowedScopeInput[],
  ): Promise<RolesIsAllowedScope[]> {
    return this.repository.update(documents);
  }

  async remove(
    documents: RemoveRolesIsAllowedScopeInput[],
  ): Promise<RolesIsAllowedScope[]> {
    return this.repository.remove(documents);
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
  }): Promise<RolesIsAllowedScope[]> {
    return this.repository.searchAllOutbound({
      startVertexId,
      filtersEdge,
      sortEdge,
      filtersVertex,
      sortVertex,
      pagination,
    });
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
  }): Promise<RolesIsAllowedScope[]> {
    return this.repository.searchAllInbound({
      startVertexId,
      filtersEdge,
      sortEdge,
      filtersVertex,
      sortVertex,
      pagination,
    });
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
    return this.repository.countAllOutbound({
      startVertexId,
      filtersEdge,
      filtersVertex,
    });
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
    return this.repository.countAllInbound({
      startVertexId,
      filtersEdge,
      filtersVertex,
    });
  }
}
