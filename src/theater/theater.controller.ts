import { Controller, Get, Query } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { ResponseType } from 'src/shared/types/common/return.type';
import { ReturnTheaterDto } from './dto/theater.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Theater')
@Controller('api/v1/theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @ApiOperation({ summary: 'Get all theater' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('get-all-theater')
  getAllTheater(): Promise<ResponseType<ReturnTheaterDto[]>> {
    return this.theaterService.getAllTheater();
  }

  @ApiOperation({ summary: 'Get type theater' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('type')
  getTypeTheater(): Promise<ResponseType<string[]>> {
    return this.theaterService.getTypeTheater();
  }

  @ApiOperation({ summary: 'Get list theater by cinema Id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('cinema')
  getTheatersByCinemaId(
    @Query('cinemaId') cinemaId: string,
  ): Promise<ResponseType<ReturnTheaterDto[]>> {
    return this.theaterService.getTheatersByCinemaId(+cinemaId);
  }

  @ApiOperation({ summary: 'Get list theater by type' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('search')
  getTheaterByType(
    @Query('typeTheater') typeTheater: string,
  ): Promise<ResponseType<ReturnTheaterDto[]>> {
    return this.theaterService.getTheaterByType(typeTheater);
  }
}
