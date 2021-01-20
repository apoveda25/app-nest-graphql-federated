import { Injectable } from '@nestjs/common';
import { PaginationInput } from 'src/commons/pagination.input';
import { CreateRoleInput } from './dto/create-role.input';
import { FilterRoleInput } from './dto/filter-role.input';
import { RemoveRoleInput } from './dto/remove-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(documents: CreateRoleInput[]) {
    return this.rolesRepository.create(documents);
  }

  async findAll({
    filters,
    sort,
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<Role[]> {
    return this.rolesRepository.findAll({ filters, sort, pagination });
  }

  async countAll(filters?: IFilterToAQL[]): Promise<number> {
    return this.countAll(filters);
  }

  async findOne(_key: string): Promise<Role | unknown> {
    return this.rolesRepository.findOne(_key);
  }

  async update(documents: UpdateRoleInput[]): Promise<Role[]> {
    return this.rolesRepository.update(documents);
  }

  async remove(documents: RemoveRoleInput[]): Promise<Role[]> {
    // return this.rolesRepository.remove(documents);
    return new Promise(() => documents);
  }
}
