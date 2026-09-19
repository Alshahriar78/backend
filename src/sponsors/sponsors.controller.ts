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
  SponsorsService,
} from './sponsors.service.js';

import {
  CreateSponsorDto,
} from './dto/create-sponsor.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('sponsors')
export class SponsorsController {
  constructor(
    private readonly sponsorsService:
      SponsorsService,
  ) {}

  // Create sponsor
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateSponsorDto,
  ) {
    return this.sponsorsService.create(
      dto,
    );
  }

  // Get all sponsors
  @Get()
  findAll() {
    return this.sponsorsService.findAll();
  }

  // Get active sponsors
  @Get('active')
  findActive() {
    return this.sponsorsService.findActive();
  }

  // Get sponsors by type
  @Get('type/:type')
  findByType(
    @Param('type')
    type: string,
  ) {
    return this.sponsorsService.findByType(
      type,
    );
  }

  // Get single sponsor
  @Get(':id')
  findOne(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.sponsorsService.findOne(id);
  }
}