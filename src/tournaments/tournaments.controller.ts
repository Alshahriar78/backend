import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TournamentsService } from './tournaments.service.js';
import { CreateTournamentDto } from './dto/create-tournament.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('tournaments')
export class TournamentsController {
  constructor(
    private readonly tournamentsService: TournamentsService,
  ) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentsService.create(
      createTournamentDto,
    );
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.tournamentsService.findOne(
      id,
    );
  }
}