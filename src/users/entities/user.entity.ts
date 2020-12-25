import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Example field: Users/1234567' })
  _id: string;

  @Field(() => ID, { description: 'Example field: 1234567' })
  _key: string;

  @Field(() => String, { description: 'Example field: name@domain.com' })
  email: string;

  @Field(() => String, { description: 'Example field: username' })
  username: string;

  @HideField()
  password: string;

  @Field(() => String, { description: 'Example field: name' })
  name: string;

  @Field(() => String, { description: 'Example field: surname' })
  surname: string;

  @Field(() => ID, {
    description: 'Example field: Users/1234567',
  })
  createdBy: string;

  @Field(() => ID, {
    description: 'Example field: Users/1234567',
  })
  updatedBy: string;

  @Field(() => String, {
    description: `Example field: ${new Date().toISOString()}`,
  })
  createdAt: string;

  @Field(() => String, {
    description: `Example field: ${new Date().toISOString()}`,
  })
  updatedAt: string;
}
