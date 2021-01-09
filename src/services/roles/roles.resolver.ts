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
import { Permissions } from '../../authorization/permission.decorator';
import { Permission } from '../../authorization/permission';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => [Role])
  @UsePipes(RolesCreatePipe)
  @Permissions(Permission.RolesCreate)
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
  @Permissions(Permission.RolesFindAll)
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
  @Permissions(Permission.RolesCount)
  countAllRoles(
    @Args('filters', { type: () => FilterRoleInput, nullable: true })
    filters?: FilterRoleInput,
  ) {
    return this.rolesService.countAll(filters);
  }

  @Query(() => Role)
  @Permissions(Permission.RolesFindOne)
  findOneRole(@Args('_key', { type: () => ID }) _key: string) {
    return this.rolesService.findOne(_key);
  }

  @Mutation(() => [Role])
  @UsePipes(RolesUpdatePipe)
  @Permissions(Permission.RolesUpdate)
  updateRole(
    @Args(
      { name: 'update', type: () => [UpdateRoleInput] },
      new ParseArrayPipe({ items: UpdateRoleInput }),
    )
    update: UpdateRoleInput[],
  ) {
    return this.rolesService.update(update);
  }

  @Mutation(() => [Role])
  @Permissions(Permission.RolesRemove)
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
