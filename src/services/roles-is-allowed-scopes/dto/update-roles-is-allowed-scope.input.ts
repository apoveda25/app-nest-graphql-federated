import { CreateRolesIsAllowedScopeInput } from './create-roles-is-allowed-scope.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRolesIsAllowedScopeInput extends PartialType(CreateRolesIsAllowedScopeInput) {
  @Field(() => Int)
  id: number;
}
