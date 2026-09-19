import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from './entities/team.entity.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';
import { CreateTeamDto } from './dto/create-team.dto.js';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(dto: CreateTeamDto) {
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

    const team = this.teamRepository.create({
      teamName: dto.teamName,
      playerName: dto.playerName,
      phone: dto.phone,
      logo: dto.logo,
      tournament: tournament,
    });

    return await this.teamRepository.save(team);
  }

  async findAll() {
    return await this.teamRepository.find({
      relations: {
        tournament: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.teamRepository.findOne({
      where: { id },
      relations: {
        tournament: true,
      },
    });
  }
}