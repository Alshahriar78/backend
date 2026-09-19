import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tournament } from './entities/tournament.entity.js';
import { CreateTournamentDto } from './dto/create-tournament.dto.js';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async create(
    createTournamentDto: CreateTournamentDto,
  ) {
    const tournament =
      this.tournamentRepository.create({
        ...createTournamentDto,
      });

    return this.tournamentRepository.save(
      tournament,
    );
  }

  async findAll() {
    return this.tournamentRepository.find();
  }

  async findOne(id: number) {
    return this.tournamentRepository.findOne({
      where: { id },
    });
  }
}