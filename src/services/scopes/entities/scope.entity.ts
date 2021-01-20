import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { PermissionsGranted } from '../../permissions-granted/entities/permissions-granted.entity';

@ObjectType()
export class Scope {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  _key: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => ID)
  createdBy: string;

  @Field(() => ID)
  updatedBy: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  // @Field(() => [PermissionsGranted])
  // permissionsGranted: PermissionsGranted[];
}
