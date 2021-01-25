import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { FilterRoleInput } from './dto/filter-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveRoleInput } from './dto/remove-role.input';
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
import { FilterUsersActsAsRoleInput } from '../users-acts-as-roles/dto/filter-users-acts-as-role.input';
import { SortUsersActsAsRoleInput } from '../users-acts-as-roles/dto/sort-users-acts-as-role.input';
import { FilterUserInput } from '../users/dto/filter-user.input';
import { SortUserInput } from '../users/dto/sort-user.input';
import { UsersActsAsRolesService } from '../users-acts-as-roles/users-acts-as-roles.service';
import { FilterRolesIsAllowedScopeInput } from '../roles-is-allowed-scopes/dto/filter-roles-is-allowed-scope.input';
import { SortRolesIsAllowedScopeInput } from '../roles-is-allowed-scopes/dto/sort-roles-is-allowed-scope.input';
import { FilterScopeInput } from '../scopes/dto/filter-scope.input';
import { SortScopeInput } from '../scopes/dto/sort-scope.input';
import { RolesIsAllowedScopesService } from '../roles-is-allowed-scopes/roles-is-allowed-scopes.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersActsAsRolesService: UsersActsAsRolesService,
    private readonly rolesIsAllowedService: RolesIsAllowedScopesService,
  ) {}

  @Mutation(() => [Role])
  @UsePipes(CreateResourcePipe)
  @Authorization(Permission.RolesCreate)
  createRoles(
    @Args(
      {
        name: 'create',
        type: () => [CreateRoleInput],
      },
      new ParseArrayPipe({ items: CreateRoleInput }),
    )
    create: CreateRoleInput[],
  ) {
    return this.rolesService.create(create);
  }

  @Query(() => [Role])
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.RolesSearch)
  searchRoles(
    @Args('filters', { type: () => FilterRoleInput, nullable: true })
    filters?: IFilterToAQL[],

    @Args('sort', { type: () => SortRoleInput, nullable: true })
    sort?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.rolesService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.RolesCount)
  countRoles(
    @Args('filters', { type: () => FilterRoleInput, nullable: true })
    filters?: IFilterToAQL[],
  ) {
    return this.rolesService.countAll(filters);
  }

  @Query(() => Role)
  @Authorization(Permission.RolesFind)
  findRole(@Args('_key', { type: () => ID }) _key: string) {
    return this.rolesService.findOne(_key);
  }

  @Mutation(() => [Role])
  @UsePipes(UpdateResourcePipe)
  @Authorization(Permission.RolesUpdate)
  updateRoles(
    @Args(
      { name: 'update', type: () => [UpdateRoleInput] },
      new ParseArrayPipe({ items: UpdateRoleInput }),
    )
    update: UpdateRoleInput[],
  ) {
    return this.rolesService.update(update);
  }

  @Mutation(() => [Role])
  @UsePipes(RemoveResourcePipe)
  @Authorization(Permission.RolesRemove)
  removeRoles(
    @Args(
      { name: 'remove', type: () => [RemoveRoleInput] },
      new ParseArrayPipe({ items: RemoveRoleInput }),
    )
    remove: RemoveRoleInput[],
  ) {
    return this.rolesService.remove(remove);
  }

  @ResolveField()
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.UsersActsAsRolesSearchInbound)
  async actsAsReverse(
    @Parent() role: Role,

    @Args('filtersEdge', {
      type: () => FilterUsersActsAsRoleInput,
      nullable: true,
    })
    filtersEdge?: IFilterToAQL[],

    @Args('sortEdge', {
      type: () => SortUsersActsAsRoleInput,
      nullable: true,
    })
    sortEdge?: ISortToAQL[],

    @Args('filtersVertex', {
      type: () => FilterUserInput,
      nullable: true,
    })
    filtersVertex?: IFilterToAQL[],

    @Args('sortVertex', {
      type: () => SortUserInput,
      nullable: true,
    })
    sortVertex?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.usersActsAsRolesService.searchAllOutbound({
      startVertexId: role._id,
      filtersEdge,
      sortEdge,
      filtersVertex,
      sortVertex,
      pagination,
    });
  }

  @ResolveField()
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.RolesIsAllowedScopesSearchOutbound)
  async isAllowed(
    @Parent() role: Role,

    @Args('filtersEdge', {
      type: () => FilterRolesIsAllowedScopeInput,
      nullable: true,
    })
    filtersEdge?: IFilterToAQL[],

    @Args('sortEdge', {
      type: () => SortRolesIsAllowedScopeInput,
      nullable: true,
    })
    sortEdge?: ISortToAQL[],

    @Args('filtersVertex', {
      type: () => FilterScopeInput,
      nullable: true,
    })
    filtersVertex?: IFilterToAQL[],

    @Args('sortVertex', {
      type: () => SortScopeInput,
      nullable: true,
    })
    sortVertex?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.rolesIsAllowedService.searchAllOutbound({
      startVertexId: role._id,
      filtersEdge,
      sortEdge,
      filtersVertex,
      sortVertex,
      pagination,
    });
  }
}
