import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Match } from './entities/match.entity.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';
import { Team } from '../teams/entities/team.entity.js';

import { CreateMatchDto } from './dto/create-match.dto.js';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateMatchDto) {
    // 1. Tournament check
    const tournament =
      await this.tournamentRepository.findOne({
        where: {
          id: dto.tournamentId,
        },
      });

    if (!tournament) {
      throw new NotFoundException(
        'Tournament not found',
      );
    }

    // 2. Home team check
    const homeTeam =
      await this.teamRepository.findOne({
        where: {
          id: dto.homeTeamId,
        },
        relations: {
          tournament: true,
        },
      });

    if (!homeTeam) {
      throw new NotFoundException(
        'Home team not found',
      );
    }

    // 3. Away team check
    const awayTeam =
      await this.teamRepository.findOne({
        where: {
          id: dto.awayTeamId,
        },
        relations: {
          tournament: true,
        },
      });

    if (!awayTeam) {
      throw new NotFoundException(
        'Away team not found',
      );
    }

    // 4. Same team validation
    if (homeTeam.id === awayTeam.id) {
      throw new BadRequestException(
        'A team cannot play against itself',
      );
    }

    // 5. Same tournament validation
    if (
      homeTeam.tournament.id !==
        tournament.id ||
      awayTeam.tournament.id !==
        tournament.id
    ) {
      throw new BadRequestException(
        'Both teams must belong to the selected tournament',
      );
    }

    // 6. Create match
    const match = this.matchRepository.create({
      tournament,
      homeTeam,
      awayTeam,
      matchDate: new Date(dto.matchDate),
      venue: dto.venue,
      round: dto.round,
      homeScore: 0,
      awayScore: 0,
      status: 'scheduled',
    });

    // 7. Save match
    return await this.matchRepository.save(match);
  }

  async findAll() {
    return await this.matchRepository.find({
      relations: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
      },
      order: {
        matchDate: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const match =
      await this.matchRepository.findOne({
        where: {
          id,
        },
        relations: {
          tournament: true,
          homeTeam: true,
          awayTeam: true,
        },
      });

    if (!match) {
      throw new NotFoundException(
        'Match not found',
      );
    }

    return match;
  }

  async updateResult(
  id: number,
  homeScore: number,
  awayScore: number,
) {
  const match =
    await this.matchRepository.findOne({
      where: {
        id,
      },
      relations: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
      },
    });

  if (!match) {
    throw new NotFoundException(
      'Match not found',
    );
  }

  // Update scores
  match.homeScore = homeScore;
  match.awayScore = awayScore;

  // Mark match as completed
  match.status = 'completed';

  return await this.matchRepository.save(match);
}
}