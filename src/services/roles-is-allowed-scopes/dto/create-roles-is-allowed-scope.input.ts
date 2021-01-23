import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolesIsAllowedScopeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
