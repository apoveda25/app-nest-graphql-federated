import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class UsersActsAsRole {
  @Field(() => ID, { nullable: true })
  @Matches(/^[\w]+$/)
  @IsOptional()
  _id: string;

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

  @HideField()
  deleted = false;

  @HideField()
  @Matches(/^Users\/[\w]+$/)
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
