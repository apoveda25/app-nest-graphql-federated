import { Injectable } from '@nestjs/common';
import { CreateRolesIsAllowedScopeInput } from './dto/create-roles-is-allowed-scope.input';
import { UpdateRolesIsAllowedScopeInput } from './dto/update-roles-is-allowed-scope.input';

@Injectable()
export class RolesIsAllowedScopesService {
  create(createRolesIsAllowedScopeInput: CreateRolesIsAllowedScopeInput) {
    return 'This action adds a new rolesIsAllowedScope';
  }

  findAll() {
    return `This action returns all rolesIsAllowedScopes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesIsAllowedScope`;
  }

  update(id: number, updateRolesIsAllowedScopeInput: UpdateRolesIsAllowedScopeInput) {
    return `This action updates a #${id} rolesIsAllowedScope`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesIsAllowedScope`;
  }
}
