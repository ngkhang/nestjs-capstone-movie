import { Controller, Get, Query } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { ResponseType } from 'src/shared/types/common/return.type';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CinemaDto } from './dto/cinema.dto';

@ApiTags('Cinema')
@Controller('api/v1/cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @ApiOperation({ summary: 'Get all cinema' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('get-all-cinema')
  async getAllCinema(): Promise<ResponseType<CinemaDto[]>> {
    return this.cinemaService.getAllCinema();
  }

  @ApiOperation({ summary: 'Get cinema by Id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('')
  async getCinemaById(
    @Query('cinemaId') cinemaId: string,
  ): Promise<ResponseType<CinemaDto>> {
    return this.cinemaService.getCinemaById(+cinemaId);
  }

  @ApiOperation({ summary: 'Search cinema by name' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('search')
  async search(
    @Query('keyword') keyword: string,
  ): Promise<ResponseType<CinemaDto[]>> {
    return this.cinemaService.search(keyword);
  }

  @ApiOperation({ summary: 'Get list ciname of cineplex by cineplex code' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('cineplex')
  async getCinemaByCineplexCode(
    @Query('cineplexCode') cineplexCode: string,
  ): Promise<ResponseType<CinemaDto[]>> {
    return this.cinemaService.getCinemaByCineplexCode(cineplexCode);
  }
}
