import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PermissionsGranted {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
