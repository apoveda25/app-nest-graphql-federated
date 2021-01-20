import { Injectable } from '@nestjs/common';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';
import { Scope } from './entities/scope.entity';
import { FilterScopeInput } from './dto/filter-scope.input';
import { SortScopeInput } from './dto/sort-scope.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveScopeInput } from './dto/remove-scope.input';
import { ScopesRepository } from './scopes.repository';

@Injectable()
export class ScopesService {
  constructor(private readonly scopesRepository: ScopesRepository) {}

  async create(documents: CreateScopeInput[]) {
    return this.scopesRepository.create(documents);
  }

  async findAll({
    filters,
    sort,
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: FilterScopeInput;
    sort?: SortScopeInput;
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    return this.scopesRepository.findAll({ filters, sort, pagination });
  }

  async countAll(filters?: FilterScopeInput): Promise<number> {
    return this.scopesRepository.countAll(filters);
  }

  async findOne(_key: string): Promise<Scope | unknown> {
    return this.scopesRepository.findOne(_key);
  }

  async update(documents: UpdateScopeInput[]): Promise<Scope[]> {
    return this.scopesRepository.update(documents);
  }

  async remove(documents: RemoveScopeInput[]): Promise<Scope[]> {
    // return this.scopesRepository.remove(documents);
    return new Promise(() => documents);
  }
}
