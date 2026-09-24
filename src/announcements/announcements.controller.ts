import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  AnnouncementsService,
} from './announcements.service.js';

import {
  CreateAnnouncementDto,
} from './dto/create-announcement.dto.js';

import {
  UpdateAnnouncementDto,
} from './dto/update-announcement.dto.js';

import {
  JwtAuthGuard,
} from '../auth/jwt-auth.guard.js';

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

  // Get published announcements
  @Get('published')
  findPublished() {
    return this.announcementsService.findPublished();
  }

  // Get single announcement
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.announcementsService.findOne(
      id,
    );
  }

  // Update announcement
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
    @Body()
    dto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(
      id,
      dto,
    );
  }

  // Toggle publish / unpublish
  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-publish')
  togglePublish(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.announcementsService.togglePublish(
      id,
    );
  }

  // Delete announcement
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.announcementsService.remove(
      id,
    );
  }
}