import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';

@InputType()
export class UpdateRolesIsAllowedScopeInput {
  @Field(() => ID)
  @Matches(/^[\w]+$/)
  @IsString()
  _key: string;

  @Field(() => ID, { nullable: true })
  @Matches(/^Roles\/[\w]+$/)
  @IsString()
  _from?: string;

  @Field(() => ID, { nullable: true })
  @Matches(/^Scopes\/[\w]+$/)
  @IsString()
  _to?: string;

  @HideField()
  @Matches(/^Users\/[\w]+$/)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
