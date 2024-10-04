import { CreateUserDto } from 'src/user/dto/create-user.dto';

export interface RegisterType {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export class RegisterAuthDto extends CreateUserDto {}
