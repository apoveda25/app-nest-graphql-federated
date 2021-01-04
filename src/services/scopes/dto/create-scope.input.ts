import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsBoolean, IsString, Matches } from 'class-validator';

@InputType()
export class CreateScopeInput {
  @Field(() => ID, { nullable: true })
  _key?: string;

  @Field(() => String)
  @Matches(/^[\w]+([\s][\w]+)*$/)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Boolean)
  @IsBoolean()
  active: boolean;

  @HideField()
  @Matches(/^Scopes\/[\w]+$/)
  @IsString()
  createdBy: string;

  @HideField()
  updatedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';
}
