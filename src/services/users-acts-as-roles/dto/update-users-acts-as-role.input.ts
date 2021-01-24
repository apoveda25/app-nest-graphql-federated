import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';
import { KEY_REGEX, UPDATED_REGEX } from '../../../commons/commons.constants';
import { USER_ID_REGEX } from '../../users/users.contants';
import { ROLE_ID_REGEX } from '../../roles/roles.contants';

@InputType()
export class UpdateUsersActsAsRoleInput {
  @Field(() => ID)
  @Matches(KEY_REGEX)
  @IsString()
  _key: string;

  @Field(() => ID, { nullable: true })
  @Matches(USER_ID_REGEX)
  @IsString()
  _from?: string;

  @Field(() => ID, { nullable: true })
  @Matches(ROLE_ID_REGEX)
  @IsString()
  _to?: string;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
