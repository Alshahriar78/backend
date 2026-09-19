import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Tournament } from '../../tournaments/entities/tournament.entity.js';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  teamName: string;

  @Column({ length: 100 })
  playerName: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToOne(
    () => Tournament,
    { onDelete: 'CASCADE' },
  )
  tournament: Tournament;
}