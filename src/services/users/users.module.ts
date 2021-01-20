import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '../../database/database.module';
import { UsersRepository } from './users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { arangodbConfig } from '../../config/modules/arangodb.config';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    // forwardRef(() => AuthorizationByRoleModule),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
