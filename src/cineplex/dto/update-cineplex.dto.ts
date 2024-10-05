import { PartialType } from '@nestjs/swagger';
import { CreateCineplexDto } from './create-cineplex.dto';

export class UpdateCineplexDto extends PartialType(CreateCineplexDto) {}
