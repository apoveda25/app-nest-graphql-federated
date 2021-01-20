import { Injectable } from '@nestjs/common';
import { PaginationInput } from '../../commons/pagination.input';
import { CreateUserHash } from './dto/create-user-hash';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { IFilterToAQL } from '../../database/arangodb/object-to-aql.interface';
import { ISortToAQL } from '../../database/arangodb/object-to-aql.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(documents: CreateUserHash[]): Promise<User[]> {
    return this.usersRepository.create(documents);
  }

  async findAll({
    filters,
    sort,
    pagination = { offset: 0, count: 10 },
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<User[]> {
    return this.usersRepository.findAll({ filters, sort, pagination });
  }

  async countAll(filters?: IFilterToAQL[]): Promise<number> {
    return this.usersRepository.countAll(filters);
  }

  async findOne(_key: string): Promise<User | unknown> {
    return this.findOne(_key);
  }

  async update(documents: UpdateUserInput[]): Promise<User[]> {
    return this.usersRepository.update(documents);
  }

  async remove(documents: RemoveUserInput[]): Promise<User[]> {
    return this.usersRepository.remove(documents);
  }
}
