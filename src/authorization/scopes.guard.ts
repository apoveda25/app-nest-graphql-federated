import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Scope } from './scopes.enum';
import { SCOPES_KEY } from './scopes.decorator';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const GqlCtx = GqlExecutionContext.create(context);
    const ctx = GqlCtx.getContext();
    const requiredScopes = this.reflector.getAllAndOverride<Scope[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredScopes) {
      return true;
    }
    const { user } = ctx;

    return requiredScopes.some((scope) => user.scopes?.includes(scope));
  }
}
