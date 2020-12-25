import { UseGuards, ParseArrayPipe } from '@nestjs/common';
import {
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
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { FilterUserInput } from './dto/filter-user.input';
import { SortUserInput } from './dto/sort-user.input';
import { PaginationInput } from '../commons/pagination.input';
import { UsersCreateGuard } from './guards/users-create.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => [User])
  @UseGuards(UsersCreateGuard)
  createUsers(
    @Args(
      {
        name: 'create',
        type: () => [CreateUserInput],
      },
      new ParseArrayPipe({ items: CreateUserInput }),
    )
    create: CreateUserInput[],
    @Context('userId') userId: string,
  ) {
    return this.usersService.create(
      create.map((el) => ({ ...el, createdBy: userId })),
    );
  }

  @Query(() => [User], { name: 'findUsers' })
  findAll(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters: FilterUserInput,
    @Args('sort', { type: () => SortUserInput, nullable: true })
    sort: SortUserInput,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
  ) {
    return this.usersService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int, { name: 'countUsers' })
  countAll(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters: FilterUserInput,
  ) {
    return this.usersService.countAll({ filters });
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('_key', { type: () => ID }) _key: string) {
    return this.usersService.findOne(_key);
  }

  @Mutation(() => [User])
  updateUsers(
    @Args(
      { name: 'update', type: () => [UpdateUserInput] },
      new ParseArrayPipe({ items: UpdateUserInput }),
    )
    update: UpdateUserInput[],
    @Context('userId') userId: string,
  ) {
    return this.usersService.update(
      update.map((el) => ({ ...el, updatedBy: userId })),
    );
  }

  @Mutation(() => [User])
  removeUsers(
    @Args({ name: 'remove', type: () => [RemoveUserInput] })
    remove: RemoveUserInput[],
  ) {
    return this.usersService.remove(remove);
  }
}
