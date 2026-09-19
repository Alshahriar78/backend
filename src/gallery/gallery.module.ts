import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Gallery } from './entities/gallery.entity.js';
import { GalleryService } from './gallery.service.js';
import { GalleryController } from './gallery.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gallery,
    ]),AuthModule
  ],

  controllers: [
    GalleryController,
  ],

  providers: [
    GalleryService,
  ],
})
export class GalleryModule {}