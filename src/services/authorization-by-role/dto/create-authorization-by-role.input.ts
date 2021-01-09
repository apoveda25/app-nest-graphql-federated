import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsOptional, Matches, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateAuthorizationByRoleInput {
  @Field(() => ID, { nullable: true })
  @Matches(/^[\w]+$/)
  @IsOptional()
  _key?: string;

  @Field(() => ID)
  @Matches(/^Users\/[\w]+$/)
  _from: string;

  @Field(() => ID)
  @Matches(/^Roles\/[\w]+$/)
  _to: string;

  @Field(() => Boolean)
  @IsBoolean()
  active: boolean;

  @HideField()
  @Matches(/^Users\/[\w]+$/)
  @IsString()
  createdBy: string;

  @HideField()
  updatedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';
}
