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
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { Scope } from './entities/scope.entity';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';
import { FilterScopeInput } from './dto/filter-scope.input';
import { SortScopeInput } from './dto/sort-scope.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveScopeInput } from './dto/remove-scope.input';
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

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(private readonly scopesService: ScopesService) {}

  @Mutation(() => [Scope])
  @UsePipes(CreateResourcePipe)
  @Authorization(Permission.ScopesCreate)
  createScopes(
    @Args(
      {
        name: 'create',
        type: () => [CreateScopeInput],
      },
      new ParseArrayPipe({ items: CreateScopeInput }),
    )
    create: CreateScopeInput[],
  ) {
    return this.scopesService.create(create);
  }

  @Query(() => [Scope])
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.ScopesSearch)
  searchScopes(
    @Args('filters', { type: () => FilterScopeInput, nullable: true })
    filters?: IFilterToAQL[],

    @Args('sort', { type: () => SortScopeInput, nullable: true })
    sort?: ISortToAQL[],

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.scopesService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @UsePipes(InputsQueryPipe)
  @Authorization(Permission.ScopesCount)
  countScopes(
    @Args('filters', { type: () => FilterScopeInput, nullable: true })
    filters?: IFilterToAQL[],
  ) {
    return this.scopesService.countAll(filters);
  }

  @Query(() => Scope)
  @Authorization(Permission.ScopesFind)
  findScope(@Args('_key', { type: () => ID }) _key: string) {
    return this.scopesService.findOne(_key);
  }

  @Mutation(() => [Scope])
  @UsePipes(UpdateResourcePipe)
  @Authorization(Permission.ScopesUpdate)
  updateScopes(
    @Args(
      { name: 'update', type: () => [UpdateScopeInput] },
      new ParseArrayPipe({ items: UpdateScopeInput }),
    )
    update: UpdateScopeInput[],
  ) {
    return this.scopesService.update(update);
  }

  @Mutation(() => [Scope])
  @UsePipes(RemoveResourcePipe)
  @Authorization(Permission.ScopesRemove)
  removeScopes(
    @Args(
      { name: 'remove', type: () => [RemoveScopeInput] },
      new ParseArrayPipe({ items: RemoveScopeInput }),
    )
    remove: RemoveScopeInput[],
  ) {
    return this.scopesService.remove(remove);
  }

  // @ResolveField()
  // async permissionsGranted(
  //   @Parent() scope: Scope,

  //   @Args('filtersEdge', {
  //     type: () => FilterPermissionsGrantedInput,
  //     nullable: true,
  //   })
  //   filtersEdge?: FilterPermissionsGrantedInput,

  //   @Args('sortEdge', {
  //     type: () => SortPermissionsGrantedInput,
  //     nullable: true,
  //   })
  //   sortEdge?: SortPermissionsGrantedInput,

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
  //   return this.permissionsGrantedService.inboundOneLevel({
  //     _id: scope._id,
  //     filtersEdge,
  //     sortEdge,
  //     filtersVertex,
  //     sortVertex,
  //     pagination,
  //   });
  // }
}
