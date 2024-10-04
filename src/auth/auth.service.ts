import {
  HttpException,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { ConfigService } from '@config/config.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto, RegisterType } from './dto/register-auth.dto';
import {
  TokenReturnType,
  TokenVerifyType,
} from 'src/shared/types/common/token.type';
import { passwordService } from 'src/utils/password.util';
import { ResponseType } from 'src/shared/types/common/return.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private user = this.prismaService.user;

  async login(userLogin: LoginAuthDto): Promise<ResponseType<TokenReturnType>> {
    try {
      // 1. Get email and password from request validated
      const { email, password } = userLogin;

      // 2. Check email
      const checkEmail = await this.user.findUnique({
        where: {
          email,
        },
      });
      if (!checkEmail) throw new UnauthorizedException('Email is not correct');

      // 3. Check password
      const isCorrectPassword = await passwordService.compare(
        password,
        checkEmail.password,
      );
      if (!isCorrectPassword)
        throw new UnauthorizedException('Password is not correct');

      // 4. Create token and refresh token
      // NOTE: Save token at cookie in server
      const { token, refreshToken } = await this.generateTokens(
        checkEmail.user_id,
      );

      // 5. Save/Update refresh token in DB
      checkEmail.refresh_token = refreshToken;
      await this.user.update({
        data: checkEmail,
        where: {
          user_id: checkEmail.user_id,
        },
      });

      // 5. Response client
      return {
        data: { token, refreshToken },
        message: 'Login successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async register(
    userRegister: RegisterAuthDto,
  ): Promise<ResponseType<RegisterType>> {
    try {
      // 1. Get new info user validated
      const { role, ...rawNewUser } = userRegister;
      const { email, username, full_name, password } = rawNewUser;

      // 2. Check email and username
      const existingAccount = await this.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
        select: {
          user_id: true,
          email: true,
          username: true,
        },
      });

      if (existingAccount) {
        throw new ConflictException(
          `An account with this ${existingAccount.email === email ? 'email' : 'username'} already exists`,
        );
      }

      // 3. Hashing password and create new account
      const passwordHasing = await passwordService.hashing(password);

      // TODO: Handle only Admin must role=Admin
      const getRole = await this.prismaService.role.findUnique({
        where: {
          name: role || 'User',
        },
      });

      // 4. Insert new account into DB
      await this.user.create({
        data: {
          ...rawNewUser,
          password: passwordHasing,
          dob: rawNewUser.dob ? new Date(rawNewUser.dob) : null,
          role_id: getRole.role_id,
        },
      });

      // 5. Response client
      return {
        data: {
          email,
          username: username,
          fullName: full_name,
          password: password,
        },
        message: 'Create a new account successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async refreshTokens(token: string): Promise<ResponseType<TokenReturnType>> {
    // NOTE: Refactor code
    try {
      let userId: number;
      let useRefreshToken: boolean;
      let tokenDecode: TokenVerifyType;

      try {
        // 1. Verify the provided token
        const checkToken: TokenVerifyType = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.auth.jwtSecret,
          },
        );

        // 2. Check if token is expired
        if (this.isTokenExpired(checkToken.exp)) {
          useRefreshToken = true;
        }
        userId = checkToken.userId;
        tokenDecode = checkToken;
      } catch (error) {
        // If verification fails, assume token is expired or invalid
        useRefreshToken = true;
        // 3. Decode the token without verification to get userId
        tokenDecode = this.jwtService.decode(token);
        if (
          typeof tokenDecode === 'object' &&
          tokenDecode !== null &&
          'userId' in tokenDecode
        ) {
          userId = tokenDecode.userId;
        } else {
          throw new UnauthorizedException('Invalid token format');
        }
      }

      // 4. Get user from DB
      const user = await this.prismaService.user.findUnique({
        where: { user_id: userId },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (useRefreshToken) {
        // 5. Verify refresh token stored in the database
        try {
          await this.jwtService.verifyAsync(user.refresh_token, {
            secret: this.configService.auth.jwtRefreshSecret,
          });
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
      // 6. Compare keys
      const tokenRefDecode = this.jwtService.decode(user.refresh_token);
      if (
        !tokenRefDecode ||
        typeof tokenRefDecode !== 'object' ||
        tokenDecode.key !== tokenRefDecode.key
      ) {
        throw new UnauthorizedException('Invalid token key');
      }

      // 7. Generate new tokens
      const { token: newToken, refreshToken: newRefreshToken } =
        await this.generateTokens(user.user_id);

      // 8. Update the refresh token in the database
      await this.prismaService.user.update({
        where: { user_id: user.user_id },
        data: { refresh_token: newRefreshToken },
      });

      return {
        data: { token: newToken, refreshToken: newRefreshToken },
        message: 'Tokens refreshed successfully',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  private isTokenExpired(exp: number): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp && exp < currentTimestamp;
  }

  private async generateTokens(userId: number): Promise<TokenReturnType> {
    const { jwtSecret, jwtExpiresIn, jwtRefreshSecret, jwtRefreshExpiresIn } =
      this.configService.auth;

    const payload = {
      userId,
      key: new Date().getTime(),
    };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: jwtExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtRefreshSecret,
        expiresIn: jwtRefreshExpiresIn,
      }),
    ]);
    return {
      token,
      refreshToken,
    };
  }
}
