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
  BannersService,
} from './banners.service.js';

import {
  CreateBannerDto,
} from './dto/create-banner.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('banners')
export class BannersController {
  constructor(
    private readonly bannersService:
      BannersService,
  ) {}

  // Create banner
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateBannerDto,
  ) {
    return this.bannersService.create(dto);
  }

  // Get all banners
  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  // Get only active banners
  @Get('active')
  findActive() {
    return this.bannersService.findActive();
  }

  // Get single banner
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.bannersService.findOne(id);
  }
}