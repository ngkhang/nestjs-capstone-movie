import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/avatar-user.dto';
import storeService, { StorageName } from 'src/config/file-upload.service';
import { ResponseType } from 'src/shared/types/common/return.type';
import { TokenVerifyType } from 'src/shared/types/common/token.type';
import { ChangePasswordDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { UserDto } from 'src/shared/types/user.dto';

@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all role of account
  @ApiOperation({ summary: 'Get all role of user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('role')
  async getAllRoles(): Promise<
    ResponseType<{ roleId: number; name: string }[]>
  > {
    return this.userService.getAllRols();
  }

  // Get all users
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get()
  async getAllUsers(): Promise<ResponseType<UserDto[]>> {
    return this.userService.getAllUser();
  }

  // Get user by userId
  @ApiOperation({ summary: 'Get user by userId' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('searchById')
  async getUserById(
    @Query('userId') userId: string,
  ): Promise<ResponseType<UserDto>> {
    return this.userService.getUserById(+userId);
  }

  // Get search user by name
  @ApiOperation({ summary: 'Get user by user name' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('searchByName')
  async getUserByName(
    @Query('name') name: string,
  ): Promise<ResponseType<UserDto[]>> {
    return this.userService.getUserByName(name);
  }

  // Update profile
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update profile user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('upload-profile')
  async updateProfile(
    @Request() req: { user: TokenVerifyType },
    @Body() userInfo: UpdateUserProfileDto,
  ): Promise<ResponseType<UserDto>> {
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
  ): Promise<ResponseType<string>> {
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
  ): Promise<ResponseType<string>> {
    console.log(file.filename);
    return this.userService.uploadAvatar(file.filename, req.user.userId);
  }
}
