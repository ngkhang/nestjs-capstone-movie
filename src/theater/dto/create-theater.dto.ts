import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTheaterDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  theater_type_id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  width: number;
}
