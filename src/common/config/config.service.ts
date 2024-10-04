import { Injectable } from '@nestjs/common';
import { AllConfigType, AppConfigType, AuthConfigType } from './config.type';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly nestConfigService: NestConfigService<AllConfigType>,
  ) {}

  get app(): AppConfigType {
    return this.nestConfigService.get<AppConfigType>('app');
  }

  get auth(): AuthConfigType {
    return this.nestConfigService.get<AuthConfigType>('auth');
  }
}
