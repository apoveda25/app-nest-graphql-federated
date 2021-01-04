import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Matches, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateScopeInput {
  @Field(() => ID)
  _key: string;

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
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
