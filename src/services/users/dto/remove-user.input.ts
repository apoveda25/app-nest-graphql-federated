import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { USER_ID_REGEX } from '../users.contants';
import { DELETED_REGEX } from '../../../commons/commons.constants';

@InputType()
export class RemoveUserInput {
  @Field(() => ID)
  @Matches(USER_ID_REGEX)
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
