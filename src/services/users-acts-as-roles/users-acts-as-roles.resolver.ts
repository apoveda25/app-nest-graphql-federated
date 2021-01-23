import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsePipes, ParseArrayPipe } from '@nestjs/common';
import { UsersActsAsRolesService } from './users-acts-as-roles.service';
import { UsersActsAsRole } from './entities/users-acts-as-role.entity';
import { CreateUsersActsAsRoleInput } from './dto/create-users-acts-as-role.input';
import { UpdateUsersActsAsRoleInput } from './dto/update-users-acts-as-role.input';
import { Authorization } from '../../authorization/authorization.decorator';
import { CreateResourcePipe } from '../../commons/pipes/create-resource.pipe';
import { Permission } from '../../authorization/permission';
import { InputsQueryPipe } from '../../commons/pipes/inputs-query.pipe';
import { FilterUsersActsAsRoleInput } from './dto/filter-users-acts-as-role.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { SortUsersActsAsRoleInput } from './dto/sort-users-acts-as-role.input';
import { PaginationInput } from '../../commons/pagination.input';
import { UpdateResourcePipe } from '../../commons/pipes/update-resource.pipe';
import { RemoveResourcePipe } from '../../commons/pipes/remove-resource.pipe';
import { RemoveUsersActsAsRoleInput } from './dto/remove-users-acts-as-role.input';

@Resolver(() => UsersActsAsRole)
export class UsersActsAsRolesResolver {
  constructor(
    private readonly usersActsAsRolesService: UsersActsAsRolesService,
  ) {}

  @Mutation(() => [UsersActsAsRole])
  @UsePipes(CreateResourcePipe)
  @Authorization(Permission.UsersActsAsRolesCreate)
  createUsersActsAsRoles(
    @Args(
      { name: 'create', type: () => [CreateUsersActsAsRoleInput] },
      new ParseArrayPipe({ items: CreateUsersActsAsRoleInput }),
    )
    create: CreateUsersActsAsRoleInput[],
  ) {
    return this.usersActsAsRolesService.create(create);
  }

  @Query(() => [UsersActsAsRole])
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.UsersActsAsRolesSearch)
  searchUsersActsAsRoles(
    @Args('filters', { type: () => FilterUsersActsAsRoleInput, nullable: true })
    filters?: IFilterToAQL[],

    @Args('sort', { type: () => SortUsersActsAsRoleInput, nullable: true })
    sort?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.usersActsAsRolesService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.UsersActsAsRolesCount)
  countUsersActsAsRoles(
    @Args('filters', { type: () => FilterUsersActsAsRoleInput, nullable: true })
    filters?: IFilterToAQL[],
  ) {
    return this.usersActsAsRolesService.countAll(filters);
  }

  @Query(() => UsersActsAsRole)
  @Authorization(Permission.UsersActsAsRolesFind)
  findUsersActsAsRole(@Args('_key', { type: () => ID }) _key: string) {
    return this.usersActsAsRolesService.findOne(_key);
  }

  @Mutation(() => [UsersActsAsRole])
  @UsePipes(UpdateResourcePipe)
  @Authorization(Permission.UsersActsAsRolesUpdate)
  updateUsersActsAsRoles(
    @Args(
      { name: 'update', type: () => [UpdateUsersActsAsRoleInput] },
      new ParseArrayPipe({ items: UpdateUsersActsAsRoleInput }),
    )
    update: UpdateUsersActsAsRoleInput[],
  ) {
    return this.usersActsAsRolesService.update(update);
  }

  @Mutation(() => [UsersActsAsRole])
  @UsePipes(RemoveResourcePipe)
  @Authorization(Permission.UsersActsAsRolesRemove)
  removeUsersActsAsRoles(
    @Args(
      { name: 'remove', type: () => [RemoveUsersActsAsRoleInput] },
      new ParseArrayPipe({ items: RemoveUsersActsAsRoleInput }),
    )
    remove: RemoveUsersActsAsRoleInput[],
  ) {
    return this.usersActsAsRolesService.remove(remove);
  }
}
