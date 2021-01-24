import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import {
  KEY_REGEX,
  NAME_REGEX,
  UPDATED_REGEX,
} from '../../../commons/commons.constants';

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  @Matches(KEY_REGEX)
  @IsString()
  _key: string;

  @Field(() => String, { nullable: true })
  @Matches(NAME_REGEX)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
