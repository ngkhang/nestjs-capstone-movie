import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, ResLogin } from './dto/login-auth.dto';
import { RegisterAuthDto, ResRegister } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Handle login
  @Post('login')
  async login(@Body() userLogin: LoginAuthDto): Promise<ResLogin> {
    return this.authService.login(userLogin);
  }

  // TODO: Handle sign up
  @Post('register')
  async register(@Body() userRegister: RegisterAuthDto): Promise<ResRegister> {
    return this.authService.register(userRegister);
  }

  // TODO: Handle refresh token
  // TODO: Handle reset password
  // TODO: Handle forget password
}
