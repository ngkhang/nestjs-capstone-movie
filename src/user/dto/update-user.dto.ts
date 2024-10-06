import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    type: String,
  })
  full_name?: string;
  @ApiProperty({
    type: String,
  })
  phone?: string;
  @ApiProperty({
    type: String,
  })
  dob?: string;
  @ApiProperty({
    type: String,
  })
  address?: string;
  @ApiProperty({
    type: String,
  })
  avatar?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
