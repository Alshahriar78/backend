import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Match } from '../matches/entities/match.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { Tournament } from '../tournaments/entities/tournament.entity.js';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async getStandings(tournamentId: number) {
    // 1. Check tournament
    const tournament =
      await this.tournamentRepository.findOne({
        where: {
          id: tournamentId,
        },
      });

    if (!tournament) {
      throw new NotFoundException(
        'Tournament not found',
      );
    }

    // 2. Get all teams of this tournament
    const teams =
      await this.teamRepository.find({
        where: {
          tournament: {
            id: tournamentId,
          },
        },
      });

    // 3. Get completed matches
    const matches =
      await this.matchRepository.find({
        where: {
          tournament: {
            id: tournamentId,
          },
          status: 'completed',
        },
        relations: {
          homeTeam: true,
          awayTeam: true,
        },
      });

    // 4. Create standings for every team
    const standings = new Map();

    for (const team of teams) {
      standings.set(team.id, {
        teamId: team.id,
        teamName: team.teamName,

        played: 0,
        won: 0,
        draw: 0,
        lost: 0,

        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,

        points: 0,
      });
    }

    // 5. Calculate from completed matches
    for (const match of matches) {
      const home = standings.get(
        match.homeTeam.id,
      );

      const away = standings.get(
        match.awayTeam.id,
      );

      if (!home || !away) {
        continue;
      }

      // Played
      home.played++;
      away.played++;

      // Goals
      home.goalsFor += match.homeScore;
      home.goalsAgainst += match.awayScore;

      away.goalsFor += match.awayScore;
      away.goalsAgainst += match.homeScore;

      // Result
      if (
        match.homeScore >
        match.awayScore
      ) {
        // Home win
        home.won++;
        home.points += 3;

        away.lost++;
      } else if (
        match.homeScore ===
        match.awayScore
      ) {
        // Draw
        home.draw++;
        away.draw++;

        home.points += 1;
        away.points += 1;
      } else {
        // Away win
        away.won++;
        away.points += 3;

        home.lost++;
      }
    }

    // 6. Calculate goal difference
    for (const team of standings.values()) {
      team.goalDifference =
        team.goalsFor -
        team.goalsAgainst;
    }

    // 7. Sort standings
    const result = Array.from(
      standings.values(),
    ).sort((a, b) => {
      // Points
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      // Goal Difference
      if (
        b.goalDifference !==
        a.goalDifference
      ) {
        return (
          b.goalDifference -
          a.goalDifference
        );
      }

      // Goals For
      return b.goalsFor - a.goalsFor;
    });

    return result;
  }
}