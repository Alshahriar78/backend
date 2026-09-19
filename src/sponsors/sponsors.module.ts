import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sponsor } from './entities/sponsor.entity.js';
import { SponsorsService } from './sponsors.service.js';
import { SponsorsController } from './sponsors.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sponsor,
    ]),AuthModule
  ],

  controllers: [
    SponsorsController,
  ],

  providers: [
    SponsorsService,
  ],
})
export class SponsorsModule {}