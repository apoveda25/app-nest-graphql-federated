import { InputType, Field, ID } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';

@InputType()
export class RemoveScopeInput {
  @Field(() => ID)
  @Matches(/^Scopes\/[\w]+$/)
  @IsString()
  _id: string;
}
