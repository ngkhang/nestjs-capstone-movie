import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/shared/types/user.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
