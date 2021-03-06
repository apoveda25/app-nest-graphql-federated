import { Directive, ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { UsersActsAsRole } from '../../users-acts-as-roles/entities/users-acts-as-role.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  emailActive: boolean;

  @Field(() => String)
  emailCode: string;

  @Field(() => String)
  username: string;

  @HideField()
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => ID)
  createdBy: string;

  @Field(() => ID)
  updatedBy: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => [UsersActsAsRole])
  actsAs: UsersActsAsRole[];
}
