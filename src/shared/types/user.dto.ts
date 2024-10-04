import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
