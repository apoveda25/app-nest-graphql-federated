import { Injectable } from '@nestjs/common';
import { CreateUsersActsAsRoleInput } from './dto/create-users-acts-as-role.input';
import { UpdateUsersActsAsRoleInput } from './dto/update-users-acts-as-role.input';
import { UsersActsAsRolesRepository } from './users-acts-as-roles.repository';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { PaginationInput } from '../../commons/pagination.input';
import { UsersActsAsRole } from './entities/users-acts-as-role.entity';
import { RemoveUsersActsAsRoleInput } from './dto/remove-users-acts-as-role.input';

@Injectable()
export class UsersActsAsRolesService {
  constructor(private readonly repository: UsersActsAsRolesRepository) {}

  async create(documents: CreateUsersActsAsRoleInput[]) {
    return this.repository.create(documents);
  }

  async findAll({
    filters,
    sort,
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
    return this.repository.findAll({ filters, sort, pagination });
  }

  async countAll(filters?: IFilterToAQL[]): Promise<number> {
    return this.repository.countAll(filters);
  }

  async findOne(_key: string): Promise<UsersActsAsRole | unknown> {
    return this.repository.findOne(_key);
  }

  async update(
    documents: UpdateUsersActsAsRoleInput[],
  ): Promise<UsersActsAsRole[]> {
    return this.repository.update(documents);
  }

  async remove(
    documents: RemoveUsersActsAsRoleInput[],
  ): Promise<UsersActsAsRole[]> {
    return this.repository.remove(documents);
  }

  async searchAllOutbound({
    startVertexId,
    filtersEdge,
    sortEdge,
    filtersVertex,
    sortVertex,
    pagination = { offset: 0, count: 10 },
  }: {
    startVertexId: string;
    filtersEdge?: IFilterToAQL[];
    sortEdge?: ISortToAQL[];
    filtersVertex?: IFilterToAQL[];
    sortVertex?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
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
    pagination = { offset: 0, count: 10 },
  }: {
    startVertexId: string;
    filtersEdge?: IFilterToAQL[];
    sortEdge?: ISortToAQL[];
    filtersVertex?: IFilterToAQL[];
    sortVertex?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<UsersActsAsRole[]> {
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
    filtersEdge?: IFilterToAQL[];
    filtersVertex?: IFilterToAQL[];
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
    filtersEdge?: IFilterToAQL[];
    filtersVertex?: IFilterToAQL[];
  }): Promise<number> {
    return this.repository.countAllInbound({
      startVertexId,
      filtersEdge,
      filtersVertex,
    });
  }
}
