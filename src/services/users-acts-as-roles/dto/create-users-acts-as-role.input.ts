import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsOptional, IsString } from 'class-validator';
import { KEY_REGEX, CREATED_REGEX } from '../../../commons/commons.constants';
import { USER_ID_REGEX } from '../../users/users.contants';
import { ROLE_ID_REGEX } from '../../roles/roles.contants';

@InputType()
export class CreateUsersActsAsRoleInput {
  @Field(() => ID, { nullable: true })
  @Matches(KEY_REGEX)
  @IsOptional()
  _key?: string;

  @Field(() => ID)
  @Matches(USER_ID_REGEX)
  _from: string;

  @Field(() => ID)
  @Matches(ROLE_ID_REGEX)
  _to: string;

  @HideField()
  deleted = false;

  @HideField()
  @Matches(CREATED_REGEX)
  @IsString()
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
