import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { CreateUserDto } from './create-user.dto';
// import { UserDto } from 'src/shared/types/user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDtov2 extends OmitType(UserDto, [
//   'email',
//   'password',
//   'role',
// ] as const) {}

export class UpdateUserProfileDto {
  // fullName?: string;
  // phone?: string;
  // dob?: string;
  // address?: string;
  // avatar?: string;
  @ApiProperty({
    type: String,
  })
  fullName?: string;
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
