import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';

@InputType()
export class RemoveRoleInput {
  @Field(() => ID)
  @Matches(/^Roles\/[\w]+$/)
  @IsString()
  _id: string;
}
