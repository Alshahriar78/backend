import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './entities/team.entity.js';
import { TeamsController } from './teams.controller.js';
import { TeamsService } from './teams.service.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team,Tournament]),
    AuthModule,
  ],
  controllers:[TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}