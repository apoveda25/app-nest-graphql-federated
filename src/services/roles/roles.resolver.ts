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
import { Permission } from '../../authorization/permission';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../database/arangodb/object-to-aql.interface';
import { InputsQueryPipe } from '../../commons/pipes/inputs-query.pipe';
import { Authorization } from '../../authorization/authorization.decorator';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => [Role])
  @UsePipes(RolesCreatePipe)
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
  @UsePipes(RolesUpdatePipe)
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
