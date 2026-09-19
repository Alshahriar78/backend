import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  tournamentId: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  homeTeamId: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  awayTeamId: number;

  @IsDateString()
  matchDate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  venue?: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  round: number;
}