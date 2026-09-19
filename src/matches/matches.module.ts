import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Match } from './entities/match.entity.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { MatchesController } from './matches.controller.js';
import { MatchesService } from './matches.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match,Tournament,Team]),AuthModule
  ],
  controllers:[MatchesController],
  providers:[MatchesService],
})
export class MatchesModule {}