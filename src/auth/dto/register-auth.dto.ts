import { CreateUserDto } from 'src/shared/types/user.schema';

export interface ResRegister {
  data: {
    email: string;
    username: string;
    fullName: string;
    password: string;
  };
  message: string;
}

export class RegisterAuthDto extends CreateUserDto {}
