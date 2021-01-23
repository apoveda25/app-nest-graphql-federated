import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';
import { RolesIsAllowedScope } from './entities/roles-is-allowed-scope.entity';
import { CreateRolesIsAllowedScopeInput } from './dto/create-roles-is-allowed-scope.input';
import { UpdateRolesIsAllowedScopeInput } from './dto/update-roles-is-allowed-scope.input';
import { UsePipes, ParseArrayPipe } from '@nestjs/common';
import { Authorization } from '../../authorization/authorization.decorator';
import { CreateResourcePipe } from '../../commons/pipes/create-resource.pipe';
import { Permission } from '../../authorization/permission';
import { InputsQueryPipe } from '../../commons/pipes/inputs-query.pipe';
import { FilterRolesIsAllowedScopeInput } from './dto/filter-roles-is-allowed-scope.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { SortRolesIsAllowedScopeInput } from './dto/sort-roles-is-allowed-scope.input';
import { PaginationInput } from '../../commons/pagination.input';
import { UpdateResourcePipe } from '../../commons/pipes/update-resource.pipe';
import { RemoveResourcePipe } from '../../commons/pipes/remove-resource.pipe';
import { RemoveRolesIsAllowedScopeInput } from './dto/remove-roles-is-allowed-scope.input';

@Resolver(() => RolesIsAllowedScope)
export class RolesIsAllowedScopesResolver {
  constructor(
    private readonly rolesIsAllowedScopesService: RolesIsAllowedScopesService,
  ) {}

  @Mutation(() => [RolesIsAllowedScope])
  @UsePipes(CreateResourcePipe)
  @Authorization(Permission.RolesIsAllowedScopesCreate)
  createRolesIsAllowedScopes(
    @Args(
      {
        name: 'create',
        type: () => [CreateRolesIsAllowedScopeInput],
      },
      new ParseArrayPipe({ items: CreateRolesIsAllowedScopeInput }),
    )
    create: CreateRolesIsAllowedScopeInput[],
  ) {
    return this.rolesIsAllowedScopesService.create(create);
  }

  @Query(() => [RolesIsAllowedScope])
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.RolesIsAllowedScopesSearch)
  searchRolesIsAllowedScopes(
    @Args('filters', {
      type: () => FilterRolesIsAllowedScopeInput,
      nullable: true,
    })
    filters?: IFilterToAQL[],

    @Args('sort', { type: () => SortRolesIsAllowedScopeInput, nullable: true })
    sort?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.rolesIsAllowedScopesService.findAll({
      filters,
      sort,
      pagination,
    });
  }

  @Query(() => Int)
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.RolesIsAllowedScopesCount)
  countUsersActsAsRoles(
    @Args('filters', {
      type: () => FilterRolesIsAllowedScopeInput,
      nullable: true,
    })
    filters?: IFilterToAQL[],
  ) {
    return this.rolesIsAllowedScopesService.countAll(filters);
  }

  @Query(() => RolesIsAllowedScope)
  @Authorization(Permission.RolesIsAllowedScopesFind)
  findRolesIsAllowedScope(@Args('_key', { type: () => ID }) _key: string) {
    return this.rolesIsAllowedScopesService.findOne(_key);
  }

  @Mutation(() => [RolesIsAllowedScope])
  @UsePipes(UpdateResourcePipe)
  @Authorization(Permission.RolesIsAllowedScopesUpdate)
  updateRolesIsAllowedScopes(
    @Args(
      { name: 'update', type: () => [UpdateRolesIsAllowedScopeInput] },
      new ParseArrayPipe({ items: UpdateRolesIsAllowedScopeInput }),
    )
    update: UpdateRolesIsAllowedScopeInput[],
  ) {
    return this.rolesIsAllowedScopesService.update(update);
  }

  @Mutation(() => [RolesIsAllowedScope])
  @UsePipes(RemoveResourcePipe)
  @Authorization(Permission.RolesIsAllowedScopesRemove)
  removeRolesIsAllowedScopes(
    @Args(
      { name: 'remove', type: () => [RemoveRolesIsAllowedScopeInput] },
      new ParseArrayPipe({ items: RemoveRolesIsAllowedScopeInput }),
    )
    remove: RemoveRolesIsAllowedScopeInput[],
  ) {
    return this.rolesIsAllowedScopesService.remove(remove);
  }
}
