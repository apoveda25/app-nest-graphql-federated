import { Module } from '@nestjs/common';
import { FederationConfigService } from './federation-config.service';

@Module({
  providers: [FederationConfigService],
})
export class FederationModule {}
