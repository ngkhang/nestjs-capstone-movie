import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
