import { Module } from '@nestjs/common';
import { CineplexService } from './cineplex.service';
import { CineplexController } from './cineplex.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CineplexController],
  providers: [CineplexService],
})
export class CineplexModule {}
