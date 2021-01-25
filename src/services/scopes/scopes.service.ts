import { Injectable } from '@nestjs/common';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';
import { Scope } from './entities/scope.entity';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveScopeInput } from './dto/remove-scope.input';
import { ScopesRepository } from './scopes.repository';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';

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
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<Scope[]> {
    return this.scopesRepository.findAll({ filters, sort, pagination });
  }

  async countAll(filters: IFilterToAQL[]): Promise<number> {
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
