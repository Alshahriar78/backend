
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
  GalleryService,
} from './gallery.service.js';

import {
  CreateGalleryDto,
} from './dto/create-gallery.dto.js';

import {
  UpdateGalleryDto,
} from './dto/update-gallery.dto.js';

import {
  JwtAuthGuard,
} from '../auth/jwt-auth.guard.js';

@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService:
      GalleryService,
  ) {}

  // Create gallery item
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateGalleryDto,
  ) {
    return this.galleryService.create(dto);
  }

  // Get all gallery items
  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  // Get published gallery items
  @Get('published')
  findPublished() {
    return this.galleryService.findPublished();
  }

  // Get gallery items by category
  @Get('category/:category')
  findByCategory(
    @Param('category')
    category: string,
  ) {
    return this.galleryService.findByCategory(
      category,
    );
  }

  // Get single gallery item
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.galleryService.findOne(id);
  }

  // Update gallery item
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
    @Body()
    dto: UpdateGalleryDto,
  ) {
    return this.galleryService.update(
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
    return this.galleryService.togglePublish(
      id,
    );
  }

  // Delete gallery item
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.galleryService.remove(id);
  }
}

