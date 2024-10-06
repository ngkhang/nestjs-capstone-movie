import { HttpException, Injectable } from '@nestjs/common';
import { ResponseType } from 'src/shared/types/common/return.type';
import { ReturnTheaterDto } from './dto/theater.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class TheaterService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTheater(): Promise<ResponseType<ReturnTheaterDto[]>> {
    try {
      const theaters = await this.prismaService.theater.findMany({
        orderBy: { cinema: { name: 'asc' } },
        select: {
          theater_id: true,
          name: true,
          height: true,
          width: true,
          created_at: true,
          cinema: {
            select: { name: true, address: true },
          },
          theater_type: {
            select: { name: true },
          },
        },
      });

      const formatData = theaters.map((theater) => {
        const {
          name,
          height,
          width,
          theater_id: theaterId,
          cinema,
          created_at: createdAt,
        } = theater;
        return {
          name,
          theaterId,
          height,
          width,
          cinema,
          type: theater.theater_type.name,
          createdAt,
        };
      });

      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getTypeTheater(): Promise<ResponseType<string[]>> {
    try {
      const types = await this.prismaService.theater_type.findMany();

      return {
        data: types.map(({ name }) => name),
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getTheatersByCinemaId(
    cinemaId: number,
  ): Promise<ResponseType<ReturnTheaterDto[]>> {
    try {
      const theaters = await this.prismaService.theater.findMany({
        where: { cinema_id: cinemaId },
        select: {
          theater_id: true,
          name: true,
          height: true,
          width: true,
          created_at: true,
          cinema: {
            select: { name: true, address: true },
          },
          theater_type: {
            select: { name: true },
          },
        },
      });
      const formatData = theaters.map((theater) => {
        const {
          name,
          height,
          width,
          theater_id: theaterId,
          cinema,
          created_at: createdAt,
        } = theater;
        return {
          name,
          theaterId,
          height,
          width,
          cinema,
          type: theater.theater_type.name,
          createdAt,
        };
      });

      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getTheaterByType(
    typeName: string,
  ): Promise<ResponseType<ReturnTheaterDto[]>> {
    try {
      const type = await this.prismaService.theater_type.findUnique({
        where: { name: typeName },
      });

      const theaters = await this.prismaService.theater.findMany({
        where: { theater_type_id: type.theater_type_id },

        select: {
          theater_id: true,
          name: true,
          height: true,
          width: true,
          created_at: true,
          cinema: {
            select: { name: true, address: true },
          },
          theater_type: {
            select: { name: true },
          },
        },
      });
      const formatData = theaters.map((theater) => {
        const {
          name,
          height,
          width,
          theater_id: theaterId,
          cinema,
          created_at: createdAt,
        } = theater;
        return {
          name,
          theaterId,
          height,
          width,
          cinema,
          type: theater.theater_type.name,
          createdAt,
        };
      });

      return {
        data: formatData,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }
}
