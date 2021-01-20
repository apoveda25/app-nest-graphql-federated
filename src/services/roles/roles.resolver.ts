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
import { RolesCreatePipe } from './pipes/roles-create.pipe';
import { RolesUpdatePipe } from './pipes/roles-update.pipe';
import { Permissions } from '../../authorization/permission.decorator';
import { Permission } from '../../authorization/permission';
import { FilterUserInput } from '../users/dto/filter-user.input';
import { SortUserInput } from '../users/dto/sort-user.input';
// import { FilterAuthorizationByRoleInput } from '../authorization-by-role/dto/filter-authorization-by-role.input';
// import { SortAuthorizationByRoleInput } from '../authorization-by-role/dto/sort-authorization-by-role.input';
// import { AuthorizationByRoleService } from '../authorization-by-role/authorization-by-role.service';
// import { PermissionsGrantedService } from '../permissions-granted/permissions-granted.service';
// import { FilterPermissionsGrantedInput } from '../permissions-granted/dto/filter-permissions-granted.input';
// import { SortPermissionsGrantedInput } from '../permissions-granted/dto/sort-permissions-granted.input';
import { FilterScopeInput } from '../scopes/dto/filter-scope.input';
import { SortScopeInput } from '../scopes/dto/sort-scope.input';

@Resolver(() => Role)
export class RolesResolver {
  // constructor(
  //   private readonly rolesService: RolesService,
  //   private readonly authorizationByRoleService: AuthorizationByRoleService,
  //   private readonly permissionsGrantedService: PermissionsGrantedService,
  // ) {}
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

  // @ResolveField()
  // async authorizationByRole(
  //   @Parent() role: Role,

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
  //     type: () => FilterUserInput,
  //     nullable: true,
  //   })
  //   filtersVertex?: FilterUserInput,

  //   @Args('sortVertex', {
  //     type: () => SortUserInput,
  //     nullable: true,
  //   })
  //   sortVertex?: SortUserInput,

  //   @Args('pagination', { type: () => PaginationInput, nullable: true })
  //   pagination?: PaginationInput,
  // ) {
  //   return this.authorizationByRoleService.inboundOneLevel({
  //     _id: role._id,
  //     filtersEdge,
  //     sortEdge,
  //     filtersVertex,
  //     sortVertex,
  //     pagination,
  //   });
  // }

  // @ResolveField()
  // async permissionsGranted(
  //   @Parent() role: Role,

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
  //     type: () => FilterScopeInput,
  //     nullable: true,
  //   })
  //   filtersVertex?: FilterScopeInput,

  //   @Args('sortVertex', {
  //     type: () => SortScopeInput,
  //     nullable: true,
  //   })
  //   sortVertex?: SortScopeInput,

  //   @Args('pagination', { type: () => PaginationInput, nullable: true })
  //   pagination?: PaginationInput,
  // ) {
  //   return this.permissionsGrantedService.outboundOneLevel({
  //     _id: role._id,
  //     filtersEdge,
  //     sortEdge,
  //     filtersVertex,
  //     sortVertex,
  //     pagination,
  //   });
  // }
}
