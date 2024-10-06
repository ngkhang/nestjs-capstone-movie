import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCinemaDto } from './create-cinema.dto';

export class CinemaDto extends CreateCinemaDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @ApiProperty({})
  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'DOB must be in format yyyy-mm-dd' })
  created_at?: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;
}
