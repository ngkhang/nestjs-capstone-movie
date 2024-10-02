import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat' })
export class IsDateFormat implements ValidatorConstraintInterface {
  validate(str: Date): boolean {
    // BUG: Fix regex -  "message": "Server Error"
    const patternDate =
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const day = str.getDate();
    const month = str.getMonth();
    const year = str.getFullYear();
    return new RegExp(patternDate).test(`${day}/${month}/${year}`);
  }
}

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

  // NOTE: Refactor
  @ApiProperty({
    example: '  ',
    description: 'Date of birth in format dd/mm/yyyy',
  })
  @IsOptional()
  @Validate(IsDateFormat, { message: 'DOB must be in format dd/mm/yyyy' })
  @Transform(({ value }) => {
    if (!value) return undefined;
    const [day, month, year] = value.split('/');
    return new Date(Date.UTC(+year, +month - 1, +day));
  })
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
