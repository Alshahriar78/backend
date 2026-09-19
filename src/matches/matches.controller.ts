import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { MatchesService } from './matches.service.js';
import { CreateMatchDto } from './dto/create-match.dto.js';
import { UpdateResultDto } from './dto/update-result.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.matchesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/result')
  updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResultDto,
  ) {
    return this.matchesService.updateResult(
      id,
      dto.homeScore,
      dto.awayScore,
    );
  }
}