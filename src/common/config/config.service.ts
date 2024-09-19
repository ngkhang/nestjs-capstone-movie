import { Injectable } from '@nestjs/common';
import { AllConfigType, AppConfigType } from './config.type';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService<AllConfigType>,
  ) {}

  get app(): AppConfigType {
    return this.configService.get<AppConfigType>('app');
  }
}
