import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Banner } from './entities/banner.entity.js';
import { BannersService } from './banners.service.js';
import { BannersController } from './banners.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Banner,
    ]),AuthModule
  ],

  controllers: [
    BannersController,
  ],

  providers: [
    BannersService,
  ],
})
export class BannersModule {}