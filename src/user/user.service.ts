import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  // UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { ReturnType } from 'src/shared/types/common.schema';
import { UpdateUserProfileDto, UserDto } from 'src/shared/types/user.schema';
import { passwordService } from 'src/utils/password.util';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private userPrisma = this.prismaService.user;

  // Get all role of account
  async getAllRols(): Promise<ReturnType<{ roleId: number; name: string }[]>> {
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
  async getAllUser(): Promise<ReturnType<UpdateUserDto[]>> {
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
  async getUserById(userId: number): Promise<ReturnType<UpdateUserDto>> {
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
  async getUserByName(userName: string): Promise<ReturnType<UpdateUserDto[]>> {
    try {
      const users = await this.userPrisma.findMany({
        where: {
          OR: [
            {
              username: {
                contains: userName,
              },
            },
            {
              full_name: {
                contains: userName,
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

  // FIXME: Update profile
  async updateProfile(
    userId: number,
    userInfo: UpdateUserProfileDto,
  ): Promise<ReturnType<UserDto>> {
    // 1. Get user by ID
    const currentInfo = await this.userPrisma.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!currentInfo) throw new NotFoundException('Not found user');

    // 2. Format new data
    // 3. Update
    // 4. Get info user updated from db
    const newData: UpdateUserProfileDto = {};

    Object.entries(userInfo).forEach(([key, value]) => {
      if (!['string', ''].includes(value)) newData[key] = value;
    });

    console.log(newData);
    await this.userPrisma.update({
      where: {
        user_id: userId,
      },
      data: { ...newData, dob: new Date(newData.dob) },
    });

    const newProfileUpdated = await this.userPrisma.findUnique({
      where: {
        user_id: userId,
      },
    });
    // const newProfileUpdated2 = await this.userPrisma.findUnique({
    //   where: {
    //     user_id: userId,
    //   },
    //   include: { role: { select: { name: true } } },
    // });
    // console.log(newProfileUpdated2);
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
  ): Promise<ReturnType<[]>> {
    try {
      const { newPassword, oldPassword } = body;
      // 1. Get user from db
      const user = await this.userPrisma.findUnique({
        where: { user_id: userId },
      });
      if (!user) throw new NotFoundException('Not found');

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
        data: [],
        message: 'Change password is successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  // TODO: Upload for profile picture
  async uploadAvatar(
    fileURL: string,
    userId: number,
  ): Promise<ReturnType<any>> {
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
      data: [],
      message: 'Upload successful',
    };
  }
}
