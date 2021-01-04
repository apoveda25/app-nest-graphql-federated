import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';

@InputType()
export class RemoveUserInput {
  @Field(() => ID)
  @Matches(/^Users\/[\w]+$/)
  @IsString()
  _id: string;
}
