import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Tournament } from '../../tournaments/entities/tournament.entity.js';
import { Team } from '../../teams/entities/team.entity.js';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, {
    onDelete: 'CASCADE',
  })
  tournament: Tournament;

  @ManyToOne(() => Team)
  homeTeam: Team;

  @ManyToOne(() => Team)
  awayTeam: Team;

  @Column({ default: 0 })
  homeScore: number;

  @Column({ default: 0 })
  awayScore: number;

  @Column({ type: 'timestamp' })
  matchDate: Date;

  @Column({ nullable: true })
  venue: string;

  @Column({ default: 1 })
  round: number;

  @Column({ default: 'scheduled' })
  status: string;
}