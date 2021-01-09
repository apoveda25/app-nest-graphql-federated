import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionsGrantedInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
