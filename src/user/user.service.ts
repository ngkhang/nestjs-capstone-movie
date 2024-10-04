import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  // UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { passwordService } from 'src/utils/password.util';
import { ResponseType } from 'src/shared/types/common/return.type';
import { ChangePasswordDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { UserDto } from 'src/shared/types/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private userPrisma = this.prismaService.user;

  // Get all role of account
  async getAllRols(): Promise<
    ResponseType<{ roleId: number; name: string }[]>
  > {
    try {
      const roles = await this.prismaService.role.findMany();

      // NOTE: Change to utility function
      const transformedData = roles.map((role) => ({
        roleId: role.role_id,
        name: role.name,
        ...Object.fromEntries(
          Object.entries(role).filter(
            ([key]) => !['role_id', 'created_at'].includes(key),
          ),
        ),
      }));

      return {
        data: transformedData,
        message: 'Success',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  // Get all users
  async getAllUser(): Promise<ResponseType<UserDto[]>> {
    try {
      const users = await this.userPrisma.findMany();
      return {
        data: users.map((user) => ({ ...user, dob: user.dob.toISOString() })),
        message: 'Success',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  // Get user by userId
  async getUserById(userId: number): Promise<ResponseType<UserDto>> {
    try {
      const user = await this.userPrisma.findUnique({
        where: {
          user_id: userId,
        },
      });

      return {
        data: {
          ...user,
          dob: user.dob.toISOString(),
        },
        message: 'Success',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  // Get search user by name
  async getUserByName(name: string): Promise<ResponseType<UserDto[]>> {
    try {
      const users = await this.userPrisma.findMany({
        where: {
          OR: [
            {
              username: {
                contains: name,
              },
            },
            {
              full_name: {
                contains: name,
              },
            },
          ],
        },
      });
      return {
        data: users.map((user) => ({ ...user, dob: user.dob.toISOString() })),
        message: 'Success',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async updateProfile(
    userId: number,
    userInfo: UpdateUserProfileDto,
  ): Promise<ResponseType<UserDto>> {
    // 1. Get user by ID
    const currentInfo = await this.userPrisma.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!currentInfo) throw new NotFoundException('Not found user');

    // 2. Format new data
    const newData: UpdateUserProfileDto = {};

    Object.entries(userInfo).forEach(([key, value]) => {
      if (!['string', ''].includes(value)) newData[key] = value;
    });

    // 3. Update
    await this.userPrisma.update({
      where: {
        user_id: userId,
      },
      data: {
        ...newData,
        dob: newData.dob ? new Date(newData.dob) : currentInfo.dob,
      },
    });
    // 4. Get info user updated from db
    const newProfileUpdated = await this.userPrisma.findUnique({
      where: {
        user_id: userId,
      },
    });

    return {
      data: {
        ...newProfileUpdated,
        dob: newProfileUpdated.dob.toISOString(),
      },
      message: 'Update profile',
    };
  }

  // Change password
  async changePassword(
    userId: number,
    body: ChangePasswordDto,
  ): Promise<ResponseType<string>> {
    try {
      const { newPassword, oldPassword } = body;
      // 1. Get user from db
      const user = await this.userPrisma.findUnique({
        where: { user_id: userId },
      });
      if (!user) throw new NotFoundException('Not found user');

      // 2. Compare old password
      const isCorrectOldPassword = await passwordService.compare(
        oldPassword,
        user.password,
      );
      if (!isCorrectOldPassword)
        throw new UnauthorizedException('Old Password is not correct');

      // 3. Update new password
      const newPassHashing = await passwordService.hashing(newPassword);
      await this.userPrisma.update({
        data: { password: newPassHashing },
        where: {
          user_id: userId,
        },
      });

      return {
        data: '',
        message: 'Change password is successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async uploadAvatar(
    fileURL: string,
    userId: number,
  ): Promise<ResponseType<string>> {
    const user = this.userPrisma.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('Not Found User');

    await this.userPrisma.update({
      data: {
        avatar: fileURL,
      },
      where: {
        user_id: userId,
      },
    });

    return {
      data: fileURL,
      message: 'Upload successful',
    };
  }
}
