import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface ResLogin {
  data: {
    access_token: string;
  };
  message: string;
}

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
