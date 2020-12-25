import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUsersInput: CreateUserInput[]): User[] {
    console.log(createUsersInput);
    return [];
  }

  findAll(filters): User[] {
    console.log(filters);

    return [];
  }

  countAll(filters): number {
    console.log(filters);

    return 0;
  }

  findOne(_key: string): unknown {
    console.log(_key);
    return { _key };
  }

  update(updateUsersInput: UpdateUserInput[]): User[] {
    console.log(updateUsersInput);
    return [];
  }

  remove(removeUsersInput: RemoveUserInput[]): User[] {
    console.log(removeUsersInput);
    return [];
  }
}
