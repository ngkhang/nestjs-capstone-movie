import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseType } from 'src/shared/types/common/return.type';
import { ReturnMovieDto } from './dto/movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenVerifyType } from 'src/shared/types/common/token.type';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('Movie')
@Controller('api/v1/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Get all genre' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('genre')
  async getAllGenres(): Promise<ResponseType<string[]>> {
    return this.movieService.getAllGenres();
  }

  @ApiOperation({ summary: 'Get movie by Id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('movie')
  async getMovieById(
    @Query('movieId') movieId: string,
  ): Promise<ResponseType<ReturnMovieDto>> {
    return this.movieService.getMovieById(+movieId);
  }

  @ApiOperation({ summary: 'Get all movie' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get()
  async getAllMovie(): Promise<ResponseType<ReturnMovieDto[]>> {
    return this.movieService.getAllMovie();
  }

  @ApiOperation({ summary: 'Get list movie by status: showing or soon' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('search/status')
  async getMoviesByStatus(
    @Query('statusName') statusName: string,
  ): Promise<ResponseType<ReturnMovieDto[]>> {
    return this.movieService.getMoviesByStatus(statusName.toLowerCase());
  }

  @ApiOperation({ summary: 'Get list movie by genre type' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get('search/genre')
  async getMoviesByGenre(
    @Query('genre') genre: string,
  ): Promise<ResponseType<ReturnMovieDto[]>> {
    return this.movieService.getMoviesByGenre(genre.toLowerCase());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('create')
  async createMovie(
    @Request() req: { user: TokenVerifyType },
    @Body() movie: CreateMovieDto,
  ): Promise<ResponseType<string>> {
    return this.movieService.createMovie(+req.user.userId, movie);
  }
}
