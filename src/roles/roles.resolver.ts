import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { FilterRoleInput } from './dto/filter-role.input';
import { SortRoleInput } from './dto/sort-role.input';
import { PaginationInput } from 'src/commons/pagination.input';
import { RemoveRoleInput } from './dto/remove-role.input';
import { RolesCreatePipe } from './pipes/roles-create.pipe';
import { RolesUpdatePipe } from './pipes/roles-update.pipe';
import { Scopes } from '../authorization/scopes.decorator';
import { Scope } from '../authorization/scopes.enum';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => [Role])
  @UsePipes(RolesCreatePipe)
  @Scopes(Scope.RolesCreate)
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
  @Scopes(Scope.RolesFindAll)
  findAllRoles(
    @Args('filters', { type: () => FilterRoleInput, nullable: true })
    filters?: FilterRoleInput,
    @Args('sort', { type: () => SortRoleInput, nullable: true })
    sort?: SortRoleInput,
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.rolesService.findAll({ filters, sort, pagination });
  }

  @Query(() => Int)
  @Scopes(Scope.RolesCount)
  countAllRoles(
    @Args('filters', { type: () => FilterRoleInput, nullable: true })
    filters?: FilterRoleInput,
  ) {
    return this.rolesService.countAll(filters);
  }

  @Query(() => Role)
  @Scopes(Scope.RolesFindOne)
  findOneRole(@Args('_key', { type: () => ID }) _key: string) {
    return this.rolesService.findOne(_key);
  }

  @Mutation(() => Role)
  @UsePipes(RolesUpdatePipe)
  @Scopes(Scope.RolesUpdate)
  updateRole(
    @Args(
      { name: 'update', type: () => [UpdateRoleInput] },
      new ParseArrayPipe({ items: UpdateRoleInput }),
    )
    update: UpdateRoleInput[],
  ) {
    return this.rolesService.update(update);
  }

  @Mutation(() => Role)
  @Scopes(Scope.RolesRemove)
  removeRole(
    @Args(
      { name: 'remove', type: () => [RemoveRoleInput] },
      new ParseArrayPipe({ items: RemoveRoleInput }),
    )
    remove: RemoveRoleInput[],
  ) {
    return this.rolesService.remove(remove);
  }
}
