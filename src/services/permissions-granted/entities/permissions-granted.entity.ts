import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Scope } from '../../scopes/entities/scope.entity';

@ObjectType()
export class PermissionsGranted {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => Role)
  _from: Role;

  @Field(() => Scope)
  _to: Scope;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => ID)
  createdBy: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ID)
  updatedBy: string;
}
