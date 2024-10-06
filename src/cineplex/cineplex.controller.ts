import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CineplexService } from './cineplex.service';
import { CineplexDto } from './dto/cineplex.dto';
import { ResponseType } from 'src/shared/types/common/return.type';
import { CreateCineplexDto } from './dto/create-cineplex.dto';
import { TokenVerifyType } from 'src/shared/types/common/token.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Cineplex')
@Controller('api/v1/cineplexs')
export class CineplexController {
  constructor(private readonly cineplexService: CineplexService) {}

  @ApiOperation({ summary: 'Get codes of cineplex' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('get-codes')
  async getCodes(): Promise<ResponseType<string[]>> {
    return this.cineplexService.getCodes();
  }

  @ApiOperation({ summary: 'Get all cineplex' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('get-all-cineplex')
  async getAll(): Promise<ResponseType<CineplexDto[]>> {
    return this.cineplexService.getAll();
  }

  @ApiOperation({ summary: 'Get cineplex by Id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('')
  async getCineplexById(
    @Query('cineplexId') cineplexId: string,
  ): Promise<ResponseType<CineplexDto>> {
    return this.cineplexService.getCineplexById(+cineplexId);
  }

  @ApiOperation({ summary: 'Search cineplex by name' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('search')
  async search(
    @Query('keyword') keyword: string,
  ): Promise<ResponseType<CineplexDto[]>> {
    return this.cineplexService.search(keyword);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new cineplex' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('create')
  async create(
    @Request() req: { user: TokenVerifyType },
    @Body() body: CreateCineplexDto,
  ) {
    return this.cineplexService.create(+req.user.userId, body);
  }
}
