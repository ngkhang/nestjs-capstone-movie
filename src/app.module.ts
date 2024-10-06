import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CineplexModule } from './cineplex/cineplex.module';
import { CinemaModule } from './cinema/cinema.module';
import { TheaterModule } from './theater/theater.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    CineplexModule,
    CinemaModule,
    TheaterModule,
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
