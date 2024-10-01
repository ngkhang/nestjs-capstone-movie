import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Request } from 'express';
import {
  LoginReturnType,
  RefreshReturnType,
  RegisterReturnType,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLogin: LoginAuthDto): Promise<LoginReturnType> {
    return this.authService.login(userLogin);
  }

  @Post('register')
  async register(
    @Body() userRegister: RegisterAuthDto,
  ): Promise<RegisterReturnType> {
    return this.authService.register(userRegister);
  }

  @Post('refresh-token')
  async refreshTokens(@Req() req: Request): Promise<RefreshReturnType> {
    const token = req.headers.authorization;
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    return this.authService.refreshTokens(cleanToken);
  }
  // TODO: Handle reset password
  // TODO: Handle forget password
}
