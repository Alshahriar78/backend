
import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

