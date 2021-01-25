import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@ObjectType()
export class UsersActsAsRole {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => User)
  _from: User;

  @Field(() => Role)
  _to: Role;

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
