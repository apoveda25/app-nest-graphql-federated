import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@ObjectType()
export class AuthorizationByRole {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => User)
  _from: User;

  @Field(() => Role)
  _to: Role;

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
