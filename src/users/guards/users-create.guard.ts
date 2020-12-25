import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UsersCreateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const scope = 'users_create';

    const { userId, scopes } = ctx;

    if (!userId) throw new Error("'x-user-id' is undefined");

    if (!/^Users\/[\w]+$/.test(userId))
      throw new Error("Wrong format of 'x-user-id'");

    if (!scopes) throw new Error("'x-scopes' is undefined");

    if (scopes && !scopes.split(',').includes(scope))
      throw new Error(`Unauthorized user, scope is missing '${scope}'`);

    return true;
  }
}
