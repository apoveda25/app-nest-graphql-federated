import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';
import { ROLES_IS_ALLOWED_SCOPES_ID_REGEX } from '../roles-is-allowed-scopes.contants';
import { DELETED_REGEX } from '../../../commons/commons.constants';

@InputType()
export class RemoveRolesIsAllowedScopeInput {
  @Field(() => ID)
  @Matches(ROLES_IS_ALLOWED_SCOPES_ID_REGEX)
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
