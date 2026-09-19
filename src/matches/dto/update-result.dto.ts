import {
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateResultDto {
  @IsNumber()
  @IsInt()
  @Min(0)
  homeScore: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  awayScore: number;
}