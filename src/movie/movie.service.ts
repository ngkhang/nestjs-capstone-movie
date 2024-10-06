import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseType } from 'src/shared/types/common/return.type';
import { PrismaService } from '@prisma/prisma.service';
import { ReturnMovieDto } from './dto/movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllGenres(): Promise<ResponseType<string[]>> {
    try {
      const genres = await this.prismaService.genre.findMany();

      return {
        data: genres.map(({ name }) => name),
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getAllMovie(): Promise<ResponseType<ReturnMovieDto[]>> {
    try {
      const movies = await this.prismaService.movie.findMany({
        include: { genre: { select: { name: true } } },
      });

      const formatData = movies.map(
        ({
          movie_id,
          short_description,
          opening_date,
          poster_url,
          banner_url,
          is_now_showing,
          is_coming_soon,
          is_active,
          created_at,
          genre,
          genre_id,
          ...movie
        }) => {
          return {
            ...movie,
            movieId: movie_id,
            shortDesc: short_description,
            openingDate: opening_date,
            posterUrl: poster_url,
            bannerUrl: banner_url,
            isNowShowing: is_now_showing,
            isComingSoon: is_coming_soon,
            isActive: is_active,
            createdAt: created_at,
            genre: {
              id: genre_id,
              name: genre.name,
            },
          };
        },
      );
      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getMoviesByStatus(
    status: string,
  ): Promise<ResponseType<ReturnMovieDto[]>> {
    try {
      const movies = await this.prismaService.movie.findMany({
        where: {
          is_coming_soon: status === 'soon',
          is_now_showing: status === 'showing',
        },
        include: { genre: { select: { name: true } } },
      });

      const formatData = movies.map(
        ({
          movie_id,
          short_description,
          opening_date,
          poster_url,
          banner_url,
          is_now_showing,
          is_coming_soon,
          is_active,
          created_at,
          genre,
          genre_id,
          ...movie
        }) => {
          return {
            ...movie,
            movieId: movie_id,
            shortDesc: short_description,
            openingDate: opening_date,
            posterUrl: poster_url,
            bannerUrl: banner_url,
            isNowShowing: is_now_showing,
            isComingSoon: is_coming_soon,
            isActive: is_active,
            createdAt: created_at,
            genre: {
              id: genre_id,
              name: genre.name,
            },
          };
        },
      );
      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getMoviesByGenre(
    genre: string,
  ): Promise<ResponseType<ReturnMovieDto[]>> {
    try {
      const movies = await this.prismaService.movie.findMany({
        where: {
          genre: { name: genre },
        },
        include: { genre: { select: { name: true } } },
      });

      const formatData = movies.map(
        ({
          movie_id,
          short_description,
          opening_date,
          poster_url,
          banner_url,
          is_now_showing,
          is_coming_soon,
          is_active,
          created_at,
          genre,
          genre_id,
          ...movie
        }) => {
          return {
            ...movie,
            movieId: movie_id,
            shortDesc: short_description,
            openingDate: opening_date,
            posterUrl: poster_url,
            bannerUrl: banner_url,
            isNowShowing: is_now_showing,
            isComingSoon: is_coming_soon,
            isActive: is_active,
            createdAt: created_at,
            genre: {
              id: genre_id,
              name: genre.name,
            },
          };
        },
      );
      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getMovieById(movieId: number): Promise<ResponseType<ReturnMovieDto>> {
    try {
      const movies = await this.prismaService.movie.findMany({
        where: {
          movie_id: movieId,
        },
        include: { genre: { select: { name: true } } },
      });

      const formatData = movies.map(
        ({
          movie_id,
          short_description,
          opening_date,
          poster_url,
          banner_url,
          is_now_showing,
          is_coming_soon,
          is_active,
          created_at,
          genre,
          genre_id,
          ...movie
        }) => {
          return {
            ...movie,
            movieId: movie_id,
            shortDesc: short_description,
            openingDate: opening_date,
            posterUrl: poster_url,
            bannerUrl: banner_url,
            isNowShowing: is_now_showing,
            isComingSoon: is_coming_soon,
            isActive: is_active,
            createdAt: created_at,
            genre: {
              id: genre_id,
              name: genre.name,
            },
          };
        },
      );
      return {
        data: formatData[0],
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async createMovie(
    userId: number,
    movie: CreateMovieDto,
  ): Promise<ResponseType<string>> {
    try {
      // Check role admin
      const user = await this.prismaService.user.findUnique({
        where: {
          user_id: userId,
        },
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      });
      if (user.role.name !== 'Admin')
        throw new UnauthorizedException('Unauthorized');

      const genre = await this.prismaService.genre.findUnique({
        where: { genre_id: movie.genre_id },
      });

      if (!genre) throw new NotFoundException('Not found genre of movie');

      const isExistsMovie = await this.prismaService.movie.findUnique({
        where: {
          title: movie.title,
        },
      });

      if (isExistsMovie) throw new ConflictException('Movie is exist');

      await this.prismaService.movie.create({
        data: {
          ...movie,
          opening_date: new Date(movie.opening_date),
          slug: movie.title.toLowerCase().replaceAll(' ', '-'),
        },
      });

      return {
        data: '',
        message: 'Create a new movie successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }
}
