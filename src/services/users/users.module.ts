import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../database/database.module';
import { UsersRepository } from './users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';
import { CommonsModule } from '../../commons/commons.module';
import { UsersActsAsRolesModule } from '../users-acts-as-roles/users-acts-as-roles.module';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    CommonsModule,
    forwardRef(() => UsersActsAsRolesModule),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
