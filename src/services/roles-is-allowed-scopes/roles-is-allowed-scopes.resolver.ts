import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesIsAllowedScopesService } from './roles-is-allowed-scopes.service';
import { RolesIsAllowedScope } from './entities/roles-is-allowed-scope.entity';
import { CreateRolesIsAllowedScopeInput } from './dto/create-roles-is-allowed-scope.input';
import { UpdateRolesIsAllowedScopeInput } from './dto/update-roles-is-allowed-scope.input';

@Resolver(() => RolesIsAllowedScope)
export class RolesIsAllowedScopesResolver {
  constructor(private readonly rolesIsAllowedScopesService: RolesIsAllowedScopesService) {}

  @Mutation(() => RolesIsAllowedScope)
  createRolesIsAllowedScope(@Args('createRolesIsAllowedScopeInput') createRolesIsAllowedScopeInput: CreateRolesIsAllowedScopeInput) {
    return this.rolesIsAllowedScopesService.create(createRolesIsAllowedScopeInput);
  }

  @Query(() => [RolesIsAllowedScope], { name: 'rolesIsAllowedScopes' })
  findAll() {
    return this.rolesIsAllowedScopesService.findAll();
  }

  @Query(() => RolesIsAllowedScope, { name: 'rolesIsAllowedScope' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesIsAllowedScopesService.findOne(id);
  }

  @Mutation(() => RolesIsAllowedScope)
  updateRolesIsAllowedScope(@Args('updateRolesIsAllowedScopeInput') updateRolesIsAllowedScopeInput: UpdateRolesIsAllowedScopeInput) {
    return this.rolesIsAllowedScopesService.update(updateRolesIsAllowedScopeInput.id, updateRolesIsAllowedScopeInput);
  }

  @Mutation(() => RolesIsAllowedScope)
  removeRolesIsAllowedScope(@Args('id', { type: () => Int }) id: number) {
    return this.rolesIsAllowedScopesService.remove(id);
  }
}
