import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';
import { UPDATED_REGEX } from '../../../commons/commons.constants';
import {
  KEY_REGEX,
  WORD_REGEX,
  NAME_REGEX,
} from '../../../commons/commons.constants';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @Matches(KEY_REGEX)
  @IsString()
  _key: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @Matches(WORD_REGEX)
  @IsString()
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @Matches(NAME_REGEX)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @Matches(NAME_REGEX)
  @IsString()
  @IsOptional()
  surname?: string;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
