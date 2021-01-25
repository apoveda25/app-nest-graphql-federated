import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Scope } from '../../scopes/entities/scope.entity';

@ObjectType()
export class RolesIsAllowedScope {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => Role)
  _from: Role;

  @Field(() => Scope)
  _to: Scope;

  @HideField()
  deleted = false;

  @HideField()
  createdBy: string;

  @HideField()
  updatedBy = '';

  @HideField()
  deletedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';

  @HideField()
  deletedAt = '';
}
