export enum Permission {
  UsersCreate = 'users_create',
  UsersUpdate = 'users_update',
  UsersRemove = 'users_remove',
  UsersFindOne = 'users_find_one',
  UsersFindAll = 'users_find_all',
  UsersCount = 'users_count',

  AuthorizationByRoleCreate = 'authorization_by_role_create',
  AuthorizationByRoleUpdate = 'authorization_by_role_update',
  AuthorizationByRoleRemove = 'authorization_by_role_remove',
  AuthorizationByRoleFindOne = 'authorization_by_role_find_one',
  AuthorizationByRoleFindAll = 'authorization_by_role_find_all',
  AuthorizationByRoleCount = 'authorization_by_role_count',

  RolesCreate = 'roles_create',
  RolesUpdate = 'roles_update',
  RolesRemove = 'roles_remove',
  RolesFindOne = 'roles_find_one',
  RolesFindAll = 'roles_find_all',
  RolesCount = 'roles_count',

  ScopesCreate = 'scopes_create',
  ScopesUpdate = 'scopes_update',
  ScopesRemove = 'scopes_remove',
  ScopesFindOne = 'scopes_find_one',
  ScopesFindAll = 'scopes_find_all',
  ScopesCount = 'scopes_count',
}
