import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from 'src/shared/types/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Handle login
  @Post('login')
  async login(@Body() userLogin: LoginUserDto) {
    return this.authService.login(userLogin);
  }

  // TODO: Handle sign up
  @Post('sign-up')
  async signUp(@Body() userSignUp: CreateUserDto) {
    return this.authService.signUp(userSignUp);
  }
}
