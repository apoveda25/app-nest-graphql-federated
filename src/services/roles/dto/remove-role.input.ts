import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { ROLE_ID_REGEX } from '../roles.contants';
import { DELETED_REGEX } from '../../../commons/commons.constants';

@InputType()
export class RemoveRoleInput {
  @Field(() => ID)
  @Matches(ROLE_ID_REGEX)
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
