import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/shared/types/user.schema';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(userLogin: LoginUserDto): Promise<any> {
    /*
      Flow code: Check mail/password -> Đúng thông tin: Tạo token -> Thông báo
    */
    // Get info from request validated

    // Check email

    // Check pass

    // Create token

    // Create refresh token -> Save refresh token in DB

    return userLogin;
  }

  async signUp(userSignUp: CreateUserDto): Promise<any> {
    /*
      Flow code: Check mail -> Logic/Mã hóa/Thêm data -> Thông báo
    */
    return userSignUp;
  }
}
