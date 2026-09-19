import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  AnnouncementsService,
} from './announcements.service.js';

import {
  CreateAnnouncementDto,
} from './dto/create-announcement.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('announcements')
export class AnnouncementsController {
  constructor(
    private readonly announcementsService:
      AnnouncementsService,
  ) {}

  // Create announcement
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateAnnouncementDto,
  ) {
    return this.announcementsService.create(
      dto,
    );
  }

  // Get all announcements
  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  // Get only published announcements
  @Get('published')
  findPublished() {
    return this.announcementsService.findPublished();
  }
}