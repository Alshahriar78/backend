import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Announcement } from './entities/announcement.entity.js';
import { AnnouncementsService } from './announcements.service.js';
import { AnnouncementsController } from './announcements.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Announcement,
    ]),AuthModule
  ],

  controllers: [
    AnnouncementsController,
  ],

  providers: [
    AnnouncementsService,
  ],
})
export class AnnouncementsModule {}