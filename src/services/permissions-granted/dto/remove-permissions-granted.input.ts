import { InputType, Field, ID } from '@nestjs/graphql';
import { Matches, IsString } from 'class-validator';

@InputType()
export class RemovePermissionsGrantedInput {
  @Field(() => ID)
  @Matches(/^PermissionsGranted\/[\w]+$/)
  @IsString()
  _id: string;
}
