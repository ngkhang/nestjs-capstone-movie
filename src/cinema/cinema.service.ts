import { HttpException, Injectable } from '@nestjs/common';
import { ResponseType } from 'src/shared/types/common/return.type';
import { PrismaService } from '@prisma/prisma.service';
import { CinemaDto } from './dto/cinema.dto';

@Injectable()
export class CinemaService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCinema(): Promise<ResponseType<CinemaDto[]>> {
    try {
      const cinemas = await this.prismaService.cinema.findMany();

      return {
        data: cinemas,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getCinemaById(cinemaId: number): Promise<ResponseType<CinemaDto>> {
    try {
      const cineplex = await this.prismaService.cinema.findUnique({
        where: {
          cinema_id: cinemaId,
        },
      });

      return {
        data: cineplex,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async search(keyword: string): Promise<ResponseType<CinemaDto[]>> {
    try {
      const cinemas = await this.prismaService.cinema.findMany({
        where: {
          name: { contains: keyword },
        },
      });

      return {
        data: cinemas,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getCinemaByCineplexCode(
    cineplexCode: string,
  ): Promise<ResponseType<CinemaDto[]>> {
    try {
      const cinemas = await this.prismaService.cinema.findMany({
        where: {
          cineplex: {
            code: cineplexCode,
          },
        },
      });

      return {
        data: cinemas,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }
}
