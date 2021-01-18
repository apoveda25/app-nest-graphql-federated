import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AuthorizationByRole } from '../../authorization-by-role/entities/authorization-by-role.entity';
import { PermissionsGranted } from '../../permissions-granted/entities/permissions-granted.entity';

@ObjectType()
export class Role {
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

  @Field(() => [AuthorizationByRole])
  authorizationByRole: AuthorizationByRole[];

  @Field(() => [PermissionsGranted])
  permissionsGranted: PermissionsGranted[];
}
