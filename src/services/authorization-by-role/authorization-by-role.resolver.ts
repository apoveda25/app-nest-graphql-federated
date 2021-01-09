import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AuthorizationByRoleService } from './authorization-by-role.service';
import { AuthorizationByRole } from './entities/authorization-by-role.entity';
import { CreateAuthorizationByRoleInput } from './dto/create-authorization-by-role.input';
import { UpdateAuthorizationByRoleInput } from './dto/update-authorization-by-role.input';
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { FilterAuthorizationByRoleInput } from './dto/filter-authorization-by-role.input';
import { SortAuthorizationByRoleInput } from './dto/sort-authorization-by-role.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemoveAuthorizationByRoleInput } from './dto/remove-authorization-by-role.input';
import { AuthorizationByRoleCreatePipe } from './pipes/authorization-by-role-create.pipe';
import { AuthorizationByRoleUpdatePipe } from './pipes/authorization-by-role-update.pipe';
import { Permissions } from '../../authorization/permission.decorator';
import { Permission } from '../../authorization/permission';

@Resolver(() => AuthorizationByRole)
export class AuthorizationByRoleResolver {
  constructor(
    private readonly authorizationByRoleService: AuthorizationByRoleService,
  ) {}

  @Mutation(() => [AuthorizationByRole])
  @UsePipes(AuthorizationByRoleCreatePipe)
  @Permissions(Permission.AuthorizationByRoleCreate)
  createAuthorizationByRole(
    @Args(
      {
        name: 'create',
        type: () => [CreateAuthorizationByRoleInput],
      },
      new ParseArrayPipe({ items: CreateAuthorizationByRoleInput }),
    )
    create: CreateAuthorizationByRoleInput[],
  ) {
    return this.authorizationByRoleService.create(create);
  }

  @Query(() => [AuthorizationByRole])
  @Permissions(Permission.AuthorizationByRoleFindAll)
  findAllAuthorizationByRole(
    @Args('filters', {
      type: () => FilterAuthorizationByRoleInput,
      nullable: true,
    })
    filters?: FilterAuthorizationByRoleInput,

    @Args('sort', { type: () => SortAuthorizationByRoleInput, nullable: true })
    sort?: SortAuthorizationByRoleInput,

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.authorizationByRoleService.findAll({
      filters,
      sort,
      pagination,
    });
  }

  @Query(() => Int)
  @Permissions(Permission.AuthorizationByRoleCount)
  countAllAuthorizationByRole(
    @Args('filters', {
      type: () => FilterAuthorizationByRoleInput,
      nullable: true,
    })
    filters?: FilterAuthorizationByRoleInput,
  ) {
    return this.authorizationByRoleService.countAll(filters);
  }

  @Query(() => AuthorizationByRole, { name: 'authorizationByRole' })
  @Permissions(Permission.AuthorizationByRoleFindOne)
  findOne(@Args('_key', { type: () => ID }) _key: string) {
    return this.authorizationByRoleService.findOne(_key);
  }

  @Mutation(() => [AuthorizationByRole])
  @UsePipes(AuthorizationByRoleUpdatePipe)
  @Permissions(Permission.AuthorizationByRoleUpdate)
  updateAuthorizationByRole(
    @Args(
      { name: 'update', type: () => [UpdateAuthorizationByRoleInput] },
      new ParseArrayPipe({ items: UpdateAuthorizationByRoleInput }),
    )
    update: UpdateAuthorizationByRoleInput[],
  ) {
    return this.authorizationByRoleService.update(update);
  }

  @Mutation(() => [AuthorizationByRole])
  @Permissions(Permission.AuthorizationByRoleRemove)
  removeAuthorizationByRole(
    @Args(
      { name: 'remove', type: () => [RemoveAuthorizationByRoleInput] },
      new ParseArrayPipe({ items: RemoveAuthorizationByRoleInput }),
    )
    remove: RemoveAuthorizationByRoleInput[],
  ) {
    return this.authorizationByRoleService.remove(remove);
  }
}
