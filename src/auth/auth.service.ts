import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { passwordService } from 'src/utils/password.util';
import { LoginAuthDto, ResLogin } from './dto/login-auth.dto';
import { RegisterAuthDto, ResRegister } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(userLogin: LoginAuthDto): Promise<ResLogin> {
    /*
      Flow code: Check mail/password -> Đúng thông tin: Tạo token -> Thông báo
    */
    try {
      const user = this.prismaService.user;

      // 1. Get email and password from request validated
      const { email, password } = userLogin;

      // 2. Check email
      const checkEmail = await user.findUnique({
        where: {
          email,
        },
      });
      if (!checkEmail) throw new UnauthorizedException('Email is not correct');

      // 3. Check pass
      const hash = await passwordService.hashing(password);
      const isCorrectPassword = await passwordService.compare(
        checkEmail.password,
        hash,
      );
      if (!isCorrectPassword)
        throw new UnauthorizedException('Password is not correct');

      // 4. Create token and refresh token
      // NOTE: Save token at cookie in server
      const key = new Date().getTime();

      const token = await this.jwtService.signAsync({
        userId: checkEmail.user_id,
        key,
      });
      const refreshToken = await this.jwtService.signAsync({
        userId: checkEmail.user_id,
        password,
        key,
      });

      // 5. Save refresh token in DB
      checkEmail.refresh_token = refreshToken;
      await user.update({
        data: checkEmail,
        where: {
          user_id: checkEmail.user_id,
        },
      });

      // 5. Response client
      return {
        data: { access_token: token },
        message: 'Login successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async register(userRegister: RegisterAuthDto): Promise<ResRegister> {
    /*
      Flow code: Check mail -> Logic/Mã hóa/Thêm data -> Thông báo
    */
    try {
      // 1. Get new info user validated
      const { role, ...rawNewUser } = userRegister;
      const { email, username, full_name, password } = rawNewUser;

      // 2. Check email and username
      const existingAccount = await this.prismaService.user.findFirst({
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
      const getRole = await this.prismaService.role.findUnique({
        where: {
          name: role || 'User',
        },
      });

      // 4. Insert new account into DB
      await this.prismaService.user.create({
        data: {
          ...rawNewUser,
          password: passwordHasing,
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
}
