import { CreatePermissionsGrantedInput } from './create-permissions-granted.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionsGrantedInput extends PartialType(CreatePermissionsGrantedInput) {
  @Field(() => Int)
  id: number;
}
