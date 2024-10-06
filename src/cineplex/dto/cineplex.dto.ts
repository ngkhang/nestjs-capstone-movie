import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCineplexDto } from './create-cineplex.dto';

export class CineplexDto extends CreateCineplexDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  cineplex_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;
}
