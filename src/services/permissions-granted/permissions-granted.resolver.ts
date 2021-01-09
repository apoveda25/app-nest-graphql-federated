import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PermissionsGrantedService } from './permissions-granted.service';
import { PermissionsGranted } from './entities/permissions-granted.entity';
import { CreatePermissionsGrantedInput } from './dto/create-permissions-granted.input';
import { UpdatePermissionsGrantedInput } from './dto/update-permissions-granted.input';
import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import { PermissionsGrantedCreatePipe } from './pipes/permissions-granted-create.pipe';
import { PermissionsGrantedUpdatePipe } from './pipes/permissions-granted-update.pipe';
import { Permissions } from '../../authorization/permission.decorator';
import { Permission } from '../../authorization/permission';
import { FilterPermissionsGrantedInput } from './dto/filter-permissions-granted.input';
import { SortPermissionsGrantedInput } from './dto/sort-permissions-granted.input';
import { PaginationInput } from '../../commons/pagination.input';
import { RemovePermissionsGrantedInput } from './dto/remove-permissions-granted.input';

@Resolver(() => PermissionsGranted)
export class PermissionsGrantedResolver {
  constructor(
    private readonly permissionsGrantedService: PermissionsGrantedService,
  ) {}

  @Mutation(() => [PermissionsGranted])
  @UsePipes(PermissionsGrantedCreatePipe)
  @Permissions(Permission.PermissionsGrantedCreate)
  createPermissionsGranted(
    @Args(
      {
        name: 'create',
        type: () => [CreatePermissionsGrantedInput],
      },
      new ParseArrayPipe({ items: CreatePermissionsGrantedInput }),
    )
    create: CreatePermissionsGrantedInput[],
  ) {
    return this.permissionsGrantedService.create(create);
  }

  @Query(() => [PermissionsGranted])
  @Permissions(Permission.PermissionsGrantedFindAll)
  findAllPermissionsGranted(
    @Args('filters', {
      type: () => FilterPermissionsGrantedInput,
      nullable: true,
    })
    filters?: FilterPermissionsGrantedInput,

    @Args('sort', { type: () => SortPermissionsGrantedInput, nullable: true })
    sort?: SortPermissionsGrantedInput,

    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.permissionsGrantedService.findAll({
      filters,
      sort,
      pagination,
    });
  }

  @Query(() => Int)
  @Permissions(Permission.PermissionsGrantedCount)
  countAllPermissionsGranted(
    @Args('filters', {
      type: () => FilterPermissionsGrantedInput,
      nullable: true,
    })
    filters?: FilterPermissionsGrantedInput,
  ) {
    return this.permissionsGrantedService.countAll(filters);
  }

  @Query(() => PermissionsGranted)
  @Permissions(Permission.PermissionsGrantedFindOne)
  findOnePermissionsGranted(@Args('_key', { type: () => ID }) _key: string) {
    return this.permissionsGrantedService.findOne(_key);
  }

  @Mutation(() => [PermissionsGranted])
  @UsePipes(PermissionsGrantedUpdatePipe)
  @Permissions(Permission.PermissionsGrantedUpdate)
  updatePermissionsGranted(
    @Args(
      { name: 'update', type: () => [UpdatePermissionsGrantedInput] },
      new ParseArrayPipe({ items: UpdatePermissionsGrantedInput }),
    )
    update: UpdatePermissionsGrantedInput[],
  ) {
    return this.permissionsGrantedService.update(update);
  }

  @Mutation(() => [PermissionsGranted])
  removePermissionsGranted(
    @Args(
      { name: 'remove', type: () => [RemovePermissionsGrantedInput] },
      new ParseArrayPipe({ items: RemovePermissionsGrantedInput }),
    )
    remove: RemovePermissionsGrantedInput[],
  ) {
    return this.permissionsGrantedService.remove(remove);
  }
}
