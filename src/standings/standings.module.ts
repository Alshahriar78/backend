import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StandingsService } from './standings.service.js';
import { StandingsController } from './standings.controller.js';

import { Match } from '../matches/entities/match.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Match,
      Team,
      Tournament,
    ]),
  ],

  controllers: [
    StandingsController,
  ],

  providers: [
    StandingsService,
  ],
})
export class StandingsModule {}