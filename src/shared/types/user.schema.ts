import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '  ',
    description: 'Date of birth in format yyyy-mm-dd',
  })
  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'DOB must be in format yyyy-mm-dd' })
  dob?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    type: String,
    default: 'User',
  })
  @IsOptional()
  @IsString()
  role?: string;
}
