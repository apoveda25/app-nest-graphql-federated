import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString, IsBoolean } from 'class-validator';
import {
  UPDATED_REGEX,
  NAME_REGEX,
  KEY_REGEX,
} from '../../../commons/commons.constants';

@InputType()
export class UpdateScopeInput {
  @Field(() => ID)
  @Matches(KEY_REGEX)
  @IsString()
  _key: string;

  @Field(() => String)
  @Matches(NAME_REGEX)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Boolean)
  @IsBoolean()
  active: boolean;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
