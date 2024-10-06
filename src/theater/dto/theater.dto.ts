import { ApiProperty } from '@nestjs/swagger';
import { CreateTheaterDto } from './create-theater.dto';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TypeTheater {
  theater_type_id: number;
  name: string;
  created_at: string;
  theater: string;
}

export class TheaterDto extends CreateTheaterDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  theater_id: number;

  @ApiProperty({})
  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'DOB must be in format yyyy-mm-dd' })
  created_at?: Date;
}

export class ReturnTheaterDto {
  name: string;
  theaterId: number;
  height: number;
  width: number;
  cinema: {
    name: string;
    address: string;
  };
  type: string;
  createdAt: Date;
}
