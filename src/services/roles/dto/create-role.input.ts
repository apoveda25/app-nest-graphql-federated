import { InputType, ID, Field, HideField } from '@nestjs/graphql';
import { IsBoolean, IsString, Matches, IsOptional } from 'class-validator';
import {
  KEY_REGEX,
  NAME_REGEX,
  CREATED_REGEX,
} from '../../../commons/commons.constants';

@InputType()
export class CreateRoleInput {
  @Field(() => ID, { nullable: true })
  @Matches(KEY_REGEX)
  @IsOptional()
  _key?: string;

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
