import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto, RegisterType } from './dto/register-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseType } from 'src/shared/types/common/return.type';
import { TokenReturnType } from 'src/shared/types/common/token.type';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    type: LoginAuthDto,
    examples: {
      example_1: {
        value: {
          email: 'admin@example.com',
          password: 'password123',
        } as LoginAuthDto,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Success' })
  async login(
    @Body() userLogin: LoginAuthDto,
  ): Promise<ResponseType<TokenReturnType>> {
    return this.authService.login(userLogin);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({
    type: RegisterAuthDto,
    examples: {
      example_1: {
        value: {
          email: 'user1@gmail.com',
          password: '12345',
          username: 'user01',
          full_name: 'User 1',
          phone: '0901212999',
          avatar: '',
          address: '',
          dob: '2024-10-02',
          role: 'User',
        } as RegisterAuthDto,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  async register(
    @Body() userRegister: RegisterAuthDto,
  ): Promise<ResponseType<RegisterType>> {
    return this.authService.register(userRegister);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  async refreshTokens(
    @Body() userRefreshToken: { token: string },
  ): Promise<ResponseType<TokenReturnType>> {
    const { token } = userRefreshToken;
    return this.authService.refreshTokens(token);
  }
  // TODO: Handle reset password
  // TODO: Handle forget password
}
