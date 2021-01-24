import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';
import { KEY_REGEX, UPDATED_REGEX } from '../../../commons/commons.constants';
import { ROLE_ID_REGEX } from '../../roles/roles.contants';
import { SCOPE_ID_REGEX } from '../../scopes/scopes.contants';

@InputType()
export class UpdateRolesIsAllowedScopeInput {
  @Field(() => ID)
  @Matches(KEY_REGEX)
  @IsString()
  _key: string;

  @Field(() => ID, { nullable: true })
  @Matches(ROLE_ID_REGEX)
  @IsString()
  _from?: string;

  @Field(() => ID, { nullable: true })
  @Matches(SCOPE_ID_REGEX)
  @IsString()
  _to?: string;

  @HideField()
  @Matches(UPDATED_REGEX)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
