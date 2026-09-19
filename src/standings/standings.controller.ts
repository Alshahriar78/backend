import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { StandingsService } from './standings.service.js';

@Controller('standings')
export class StandingsController {
  constructor(
    private readonly standingsService: StandingsService,
  ) {}

  @Get(':tournamentId')
  getStandings(
    @Param(
      'tournamentId',
      ParseIntPipe,
    )
    tournamentId: number,
  ) {
    return this.standingsService.getStandings(
      tournamentId,
    );
  }
}