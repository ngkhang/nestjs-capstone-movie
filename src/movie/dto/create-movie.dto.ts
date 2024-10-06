import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  genre_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  short_description: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  trailer: string;

  @ApiProperty({
    description: 'Opening date in format yyyy-mm-dd',
  })
  @IsOptional()
  @IsISO8601(
    { strict: true },
    { message: 'Opening date must be in format yyyy-mm-dd' },
  )
  opening_date?: Date;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  poster_url: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  banner_url: string;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  is_now_showing: boolean;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  is_coming_soon: boolean;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  rating: number;
}
