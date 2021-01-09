import { InputType, Field, ID } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';

@InputType()
export class RemoveAuthorizationByRoleInput {
  @Field(() => ID)
  @Matches(/^AuthorizationByRole\/[\w]+$/)
  @IsString()
  _id: string;
}
