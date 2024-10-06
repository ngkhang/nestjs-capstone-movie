import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCinemaDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  cineplex_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  latitude?: Decimal;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  longitude?: Decimal;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  map_embed: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
