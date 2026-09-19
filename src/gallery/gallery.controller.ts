import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  GalleryService,
} from './gallery.service.js';

import {
  CreateGalleryDto,
} from './dto/create-gallery.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

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
    return this.galleryService.create(
      dto,
    );
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
}