import { Injectable } from '@nestjs/common';
import { CreatePermissionsGrantedInput } from './dto/create-permissions-granted.input';
import { UpdatePermissionsGrantedInput } from './dto/update-permissions-granted.input';

@Injectable()
export class PermissionsGrantedService {
  create(createPermissionsGrantedInput: CreatePermissionsGrantedInput) {
    return 'This action adds a new permissionsGranted';
  }

  findAll() {
    return `This action returns all permissionsGranted`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionsGranted`;
  }

  update(id: number, updatePermissionsGrantedInput: UpdatePermissionsGrantedInput) {
    return `This action updates a #${id} permissionsGranted`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionsGranted`;
  }
}
