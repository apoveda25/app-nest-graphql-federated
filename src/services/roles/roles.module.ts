import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { DatabaseModule } from '../../database/database.module';
// import { AuthorizationByRoleModule } from '../authorization-by-role/authorization-by-role.module';
// import { PermissionsGrantedModule } from '../permissions-granted/permissions-granted.module';
import { RolesRepository } from './roles.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';

@Module({
  imports: [
    // DatabaseModule.forRootAsync({ useClass: ArangoDBConfig }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    // forwardRef(() => AuthorizationByRoleModule),
    // forwardRef(() => PermissionsGrantedModule),
  ],
  providers: [RolesResolver, RolesService, RolesRepository],
  exports: [RolesResolver, RolesService],
})
export class RolesModule {}
