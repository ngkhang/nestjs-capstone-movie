import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
