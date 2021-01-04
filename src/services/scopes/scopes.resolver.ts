import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { Scope } from './entities/scope.entity';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';
import { FilterScopeInput } from './dto/filter-scope.input';
import { SortScopeInput } from './dto/sort-scope.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveScopeInput } from './dto/remove-scope.input';
import { ScopesCreatePipe } from './pipes/scopes-create.pipe';
import { Permissions } from '../../authorization/permission.decorator';
import { Permission } from '../../authorization/permission';
import { ScopesUpdatePipe } from './pipes/scopes-update.pipe';

@Resolver(() => Scope)
export class ScopesResolver {
  constructor(private readonly scopesService: ScopesService) {}

  @Mutation(() => [Scope])
  @UsePipes(ScopesCreatePipe)
  @Permissions(Permission.ScopesCreate)
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
  @Permissions(Permission.ScopesFindAll)
  findAllScopes(
    @Args('filters', { type: () => FilterScopeInput, nullable: true })
    filters?: FilterScopeInput,
    @Args('sort', { type: () => SortScopeInput, nullable: true })
    sort?: SortScopeInput,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.scopesService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @Permissions(Permission.ScopesCount)
  countAllScopes(
    @Args('filters', { type: () => FilterScopeInput, nullable: true })
    filters?: FilterScopeInput,
  ) {
    return this.scopesService.countAll(filters);
  }

  @Query(() => Scope)
  @Permissions(Permission.ScopesFindOne)
  findOneScope(@Args('_key', { type: () => ID }) _key: string) {
    return this.scopesService.findOne(_key);
  }

  @Mutation(() => [Scope])
  @UsePipes(ScopesUpdatePipe)
  @Permissions(Permission.ScopesUpdate)
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
  @Permissions(Permission.ScopesRemove)
  removeScopes(
    @Args(
      { name: 'remove', type: () => [RemoveScopeInput] },
      new ParseArrayPipe({ items: RemoveScopeInput }),
    )
    remove: RemoveScopeInput[],
  ) {
    return this.scopesService.remove(remove);
  }
}
