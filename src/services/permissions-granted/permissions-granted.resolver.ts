import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionsGrantedService } from './permissions-granted.service';
import { PermissionsGranted } from './entities/permissions-granted.entity';
import { CreatePermissionsGrantedInput } from './dto/create-permissions-granted.input';
import { UpdatePermissionsGrantedInput } from './dto/update-permissions-granted.input';

@Resolver(() => PermissionsGranted)
export class PermissionsGrantedResolver {
  constructor(private readonly permissionsGrantedService: PermissionsGrantedService) {}

  @Mutation(() => PermissionsGranted)
  createPermissionsGranted(@Args('createPermissionsGrantedInput') createPermissionsGrantedInput: CreatePermissionsGrantedInput) {
    return this.permissionsGrantedService.create(createPermissionsGrantedInput);
  }

  @Query(() => [PermissionsGranted], { name: 'permissionsGranted' })
  findAll() {
    return this.permissionsGrantedService.findAll();
  }

  @Query(() => PermissionsGranted, { name: 'permissionsGranted' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionsGrantedService.findOne(id);
  }

  @Mutation(() => PermissionsGranted)
  updatePermissionsGranted(@Args('updatePermissionsGrantedInput') updatePermissionsGrantedInput: UpdatePermissionsGrantedInput) {
    return this.permissionsGrantedService.update(updatePermissionsGrantedInput.id, updatePermissionsGrantedInput);
  }

  @Mutation(() => PermissionsGranted)
  removePermissionsGranted(@Args('id', { type: () => Int }) id: number) {
    return this.permissionsGrantedService.remove(id);
  }
}
