import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';

@InputType()
export class RemoveRolesIsAllowedScopeInput {
  @Field(() => ID)
  @Matches(/^RolesIsAllowedScopes\/[\w]+$/)
  @IsString()
  _id: string;

  @HideField()
  deleted = true;

  @HideField()
  @Matches(/^Users\/[\w]+$/)
  @IsString()
  deletedBy: string;

  @HideField()
  deletedAt = new Date().toISOString();
}
