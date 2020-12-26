import { ParseArrayPipe } from '@nestjs/common';
import {
  ResolveReference,
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ID,
  Int,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserHash } from './dto/create-user-hash';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { FilterUserInput } from './dto/filter-user.input';
import { SortUserInput } from './dto/sort-user.input';
import { PaginationInput } from '../commons/pagination.input';
import { Scopes } from '../authorization/scopes.decorator';
import { Scope } from 'src/authorization/scopes.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => [User])
  @Scopes(Scope.UsersCreate)
  createUsers(
    @Args(
      {
        name: 'create',
        type: () => [CreateUserInput],
      },
      new ParseArrayPipe({ items: CreateUserInput }),
      new ParseArrayPipe({ items: CreateUserHash }),
    )
    create: CreateUserHash[],
    @Context('user') user: { _id: string; scopes: string[] },
  ) {
    return this.usersService.create(
      create.map((el) => ({ ...el, createdBy: user._id })),
    );
  }

  @Query(() => [User], { name: 'findUsers' })
  @Scopes(Scope.UsersFindAll)
  findAll(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters?: FilterUserInput,
    @Args('sort', { type: () => SortUserInput, nullable: true })
    sort?: SortUserInput,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.usersService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int, { name: 'countUsers' })
  @Scopes(Scope.UsersCount)
  count(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters?: FilterUserInput,
  ) {
    return this.usersService.countAll(filters);
  }

  @Query(() => User, { name: 'findUser' })
  @Scopes(Scope.UsersFindOne)
  findOne(@Args('_key', { type: () => ID }) _key: string) {
    return this.usersService.findOne(_key);
  }

  @Mutation(() => [User])
  @Scopes(Scope.UsersUpdate)
  updateUsers(
    @Args(
      { name: 'update', type: () => [UpdateUserInput] },
      new ParseArrayPipe({ items: UpdateUserInput }),
    )
    update: UpdateUserInput[],
    @Context('user') user: { _id: string; scopes: string[] },
  ) {
    return this.usersService.update(
      update.map((el) => ({ ...el, updatedBy: user._id })),
    );
  }

  @Mutation(() => [User])
  @Scopes(Scope.UsersRemove)
  removeUsers(
    @Args(
      { name: 'remove', type: () => [RemoveUserInput] },
      new ParseArrayPipe({ items: RemoveUserInput }),
    )
    remove: RemoveUserInput[],
  ) {
    return this.usersService.remove(remove);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; _id: string }) {
    return this.usersService.findOne(reference._id);
  }
}
