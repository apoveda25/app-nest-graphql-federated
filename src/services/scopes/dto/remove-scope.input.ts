import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';
import { UPDATED_REGEX } from '../../../commons/commons.constants';
import { SCOPE_ID_REGEX } from '../scopes.contants';

@InputType()
export class RemoveScopeInput {
  @Field(() => ID)
  @Matches(SCOPE_ID_REGEX)
  @IsString()
  _id: string;

  @HideField()
  deleted = true;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  deletedBy: string;

  @HideField()
  deletedAt = new Date().toISOString();
}
