import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class MovieDto extends CreateMovieDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  movie_id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  slug: string;
}

export class ReturnMovieDto {
  title: string;
  slug: string;
  description: string;
  duration: number;
  trailer: string;
  rating: number;
  movieId: number;
  shortDesc: string;
  openingDate: Date;
  posterUrl: string;
  bannerUrl: string;
  isNowShowing: boolean;
  isComingSoon: boolean;
  isActive: boolean;
  createdAt: Date;
  genre: {
    id: number;
    name: string;
  };
}
