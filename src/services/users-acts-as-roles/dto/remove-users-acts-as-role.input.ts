import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';
import { DELETED_REGEX } from '../../../commons/commons.constants';
import { USERS_ACTS_AS_ROLES_ID_REGEX } from '../users-acts-as-roles.contants';

@InputType()
export class RemoveUsersActsAsRoleInput {
  @Field(() => ID)
  @Matches(USERS_ACTS_AS_ROLES_ID_REGEX)
  @IsString()
  _id: string;

  @HideField()
  deleted = true;

  @HideField()
  @Matches(DELETED_REGEX)
  @IsString()
  deletedBy: string;

  @HideField()
  deletedAt = new Date().toISOString();
}
