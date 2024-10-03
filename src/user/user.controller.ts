import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnType, TokenVerifyType } from 'src/shared/types/common.schema';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto, UserDto } from 'src/shared/types/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/avatar-user.dto';
import storeService, { StorageName } from 'src/config/file-upload.service';

@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all role of account
  @ApiOperation({ summary: 'Get all role of user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      status: 200,
      content: {
        data: [
          {
            roleId: 1,
            name: 'Admin',
          },
          {
            roleId: 2,
            name: 'User',
          },
        ],
      },
      message: 'Success',
      date: '2024-10-03T05:28:21.761Z',
    },
  })
  @Get('role')
  async getAllRoles(): Promise<ReturnType<{ roleId: number; name: string }[]>> {
    return this.userService.getAllRols();
  }

  // Get all users
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      status: 200,
      content: {
        data: [
          {
            user_id: 11,
            role_id: 1,
            username: 'admin',
            email: 'admin@gmail.com',
            password:
              '$2b$10$pFOjPh5cT4Oy1.RNYpxvvOG2E8BILxaogI70IIRou5Ju15gerI1A6',
            full_name: 'Admin 01',
            refresh_token: null,
            phone: '0901212999',
            dob: '2000-02-26T00:00:00.000Z',
            address: '',
            avatar: '',
            is_active: true,
            registered_at: '2024-10-02T14:11:06.000Z',
            updated_at: '2024-10-02T16:18:51.000Z',
          },
        ],
      },
      message: 'Success',
      date: '2024-10-03T05:28:21.761Z',
    },
  })
  @Get()
  async getAllUsers(): Promise<ReturnType<UpdateUserDto[]>> {
    return this.userService.getAllUser();
  }

  // Get user by userId
  @ApiOperation({ summary: 'Get user by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      status: 200,
      content: {
        data: {
          user_id: 11,
          role_id: 1,
          username: 'admin',
          email: 'admin@gmail.com',
          password:
            '$2b$10$pFOjPh5cT4Oy1.RNYpxvvOG2E8BILxaogI70IIRou5Ju15gerI1A6',
          full_name: 'Admin 01',
          refresh_token: null,
          phone: '0901212999',
          dob: '2000-02-26T00:00:00.000Z',
          address: '',
          avatar: '',
          is_active: true,
          registered_at: '2024-10-02T14:11:06.000Z',
          updated_at: '2024-10-02T16:18:51.000Z',
        },
      },
      message: 'Success',
      date: '2024-10-03T06:03:44.621Z',
    },
  })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<ReturnType<UpdateUserDto>> {
    return this.userService.getUserById(+userId);
  }

  // Get search user by name
  @ApiOperation({ summary: 'Get user by user name' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      status: 200,
      content: {
        data: [
          {
            user_id: 11,
            role_id: 1,
            username: 'admin',
            email: 'admin@gmail.com',
            password:
              '$2b$10$pFOjPh5cT4Oy1.RNYpxvvOG2E8BILxaogI70IIRou5Ju15gerI1A6',
            full_name: 'Admin 01',
            refresh_token: null,
            phone: '0901212999',
            dob: '2000-02-26T00:00:00.000Z',
            address: '',
            avatar: '',
            is_active: true,
            registered_at: '2024-10-02T14:11:06.000Z',
            updated_at: '2024-10-02T16:18:51.000Z',
          },
        ],
      },
      message: 'Success',
      date: '2024-10-03T08:25:21.170Z',
    },
  })
  @Get('search/:userName')
  async getUserByUsername(
    @Param('userName') userName: string,
  ): Promise<ReturnType<UpdateUserDto[]>> {
    return this.userService.getUserByName(userName);
  }

  // Update profile
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update profile user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    example: {
      status: 201,
      content: {
        data: {
          user_id: 11,
          role_id: 1,
          username: 'admin',
          email: 'admin@gmail.com',
          password:
            '$2b$10$pFOjPh5cT4Oy1.RNYpxvvOG2E8BILxaogI70IIRou5Ju15gerI1A6',
          full_name: 'Admin 01',
          refresh_token: null,
          phone: '0121212121',
          dob: '2000-02-26T00:00:00.000Z',
          address: '',
          avatar: '',
          is_active: true,
          registered_at: '2024-10-02T14:11:06.000Z',
          updated_at: '2024-10-03T10:11:35.000Z',
        },
      },
      message: 'Update profile success',
      date: '2024-10-03T10:11:35.433Z',
    },
  })
  @Post('upload-profile')
  async updateProfile(
    @Request() req: { user: TokenVerifyType },
    @Body() userInfo: UpdateUserProfileDto,
  ): Promise<ReturnType<UserDto>> {
    return this.userService.updateProfile(req.user.userId, userInfo);
  }

  // Change password
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: 201,
    description: 'Successful',
  })
  @Post('change-password')
  async changePassword(
    @Request() req: { user: TokenVerifyType },
    @Body() body: ChangePasswordDto,
  ) {
    return this.userService.changePassword(req.user.userId, { ...body });
  }

  // Upload for profile picture
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiBody({
    description: 'Upload avatar',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', { storage: storeService(StorageName.User) }),
  )
  @Post('upload-avatar')
  async uploadAvatar(
    @Request() req: { user: TokenVerifyType },
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ReturnType<string>> {
    return this.userService.uploadAvatar(file.filename, req.user.userId);
  }
}
