import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import {
  ResolveReference,
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserHash } from './dto/create-user-hash';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RemoveUserInput } from './dto/remove-user.input';
import { FilterUserInput } from './dto/filter-user.input';
import { SortUserInput } from './dto/sort-user.input';
import { PaginationInput } from '../../commons/pagination.input';
import { Permission } from '../../authorization/permission';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { InputsQueryPipe } from '../../commons/pipes/inputs-query.pipe';
import { Authorization } from '../../authorization/authorization.decorator';
import { CreateResourcePipe } from '../../commons/pipes/create-resource.pipe';
import { UpdateResourcePipe } from '../../commons/pipes/update-resource.pipe';
import { RemoveResourcePipe } from '../../commons/pipes/remove-resource.pipe';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => [User])
  @UsePipes(CreateResourcePipe)
  @Authorization(Permission.UsersCreate)
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
  ) {
    return this.usersService.create(create);
  }

  @Query(() => [User])
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.UsersSearch)
  searchUsers(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters?: IFilterToAQL[],

    @Args('sort', { type: () => SortUserInput, nullable: true })
    sort?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.usersService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.UsersCount)
  countUsers(
    @Args('filters', { type: () => FilterUserInput, nullable: true })
    filters?: IFilterToAQL[],
  ) {
    return this.usersService.countAll(filters);
  }

  @Query(() => User)
  @Authorization(Permission.UsersFind)
  findUser(@Args('_key', { type: () => ID }) _key: string) {
    return this.usersService.findOne(_key);
  }

  @Mutation(() => [User])
  @UsePipes(UpdateResourcePipe)
  @Authorization(Permission.UsersUpdate)
  updateUsers(
    @Args(
      { name: 'update', type: () => [UpdateUserInput] },
      new ParseArrayPipe({ items: UpdateUserInput }),
    )
    update: UpdateUserInput[],
  ) {
    return this.usersService.update(update);
  }

  @Mutation(() => [User])
  @UsePipes(RemoveResourcePipe)
  @Authorization(Permission.UsersRemove)
  removeUsers(
    @Args(
      { name: 'remove', type: () => [RemoveUserInput] },
      new ParseArrayPipe({ items: RemoveUserInput }),
    )
    remove: RemoveUserInput[],
  ) {
    return this.usersService.remove(remove);
  }

  // @ResolveField()
  // async actsAs(
  //   @Parent() user: User,

  //   @Args('filtersEdge', {
  //     type: () => FilterAuthorizationByRoleInput,
  //     nullable: true,
  //   })
  //   filtersEdge?: FilterAuthorizationByRoleInput,

  //   @Args('sortEdge', {
  //     type: () => SortAuthorizationByRoleInput,
  //     nullable: true,
  //   })
  //   sortEdge?: SortAuthorizationByRoleInput,

  //   @Args('filtersVertex', {
  //     type: () => FilterRoleInput,
  //     nullable: true,
  //   })
  //   filtersVertex?: FilterRoleInput,

  //   @Args('sortVertex', {
  //     type: () => SortRoleInput,
  //     nullable: true,
  //   })
  //   sortVertex?: SortRoleInput,

  //   @Args('pagination', { type: () => PaginationInput, nullable: true })
  //   pagination?: PaginationInput,
  // ) {
  //   return this.authorizationByRoleService.outboundOneLevel({
  //     _id: user._id,
  //     filtersEdge,
  //     sortEdge,
  //     filtersVertex,
  //     sortVertex,
  //     pagination,
  //   });
  // }

  @ResolveReference()
  resolveReference(reference: { __typename: string; _id: string }) {
    return this.usersService.findOne(reference._id);
  }
}
