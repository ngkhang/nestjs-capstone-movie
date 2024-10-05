import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseType } from 'src/shared/types/common/return.type';
import { PrismaService } from '@prisma/prisma.service';
import { CineplexDto } from './dto/cineplex.dto';
import { CreateCineplexDto } from './dto/create-cineplex.dto';

@Injectable()
export class CineplexService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCodes(): Promise<ResponseType<string[]>> {
    const codes = await this.prismaService.cineplex.findMany({
      select: { code: true },
    });

    return {
      data: codes.map(({ code }) => code),
    };
  }

  async getAll(): Promise<ResponseType<CineplexDto[]>> {
    try {
      const cineplexs = await this.prismaService.cineplex.findMany();

      return {
        data: cineplexs,
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }

  async getCineplexById(
    cineplexId: number,
  ): Promise<ResponseType<CineplexDto>> {
    try {
      const cineplex = await this.prismaService.cineplex.findUnique({
        where: {
          cineplex_id: cineplexId,
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

  async search(keyword: string): Promise<ResponseType<CineplexDto[]>> {
    try {
      const cineplex = await this.prismaService.cineplex.findMany({
        where: {
          name: { contains: keyword },
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

  async create(
    userId: number,
    cineplex: CreateCineplexDto,
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

      // Check cineplex
      const isExistsCineplex = await this.prismaService.cineplex.findUnique({
        where: {
          name: cineplex.name,
        },
      });
      if (isExistsCineplex)
        throw new ConflictException('A cineplex with this name already exists');

      // Insert new account into DB
      await this.prismaService.cineplex.create({
        data: {
          ...cineplex,
          slug: cineplex.name.toLowerCase().replaceAll(' ', '-'),
        },
      });

      // Response client
      return {
        data: '',
        message: 'Create a new cineplex successful',
      };
    } catch (error) {
      if (error.status && error.status !== 500)
        throw new HttpException(error.response, error.status);
      throw new HttpException('Server Error', 500);
    }
  }
}
