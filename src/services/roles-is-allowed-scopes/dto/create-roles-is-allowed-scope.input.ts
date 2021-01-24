import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsOptional, IsString } from 'class-validator';
import { KEY_REGEX, CREATED_REGEX } from '../../../commons/commons.constants';
import { ROLE_ID_REGEX } from '../../roles/roles.contants';
import { SCOPE_ID_REGEX } from '../../scopes/scopes.contants';

@InputType()
export class CreateRolesIsAllowedScopeInput {
  @Field(() => ID, { nullable: true })
  @Matches(KEY_REGEX)
  @IsOptional()
  _key?: string;

  @Field(() => ID)
  @Matches(ROLE_ID_REGEX)
  _from: string;

  @Field(() => ID)
  @Matches(SCOPE_ID_REGEX)
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
