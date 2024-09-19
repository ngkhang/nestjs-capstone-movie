import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // TODO: handle validation
      // TODO: handle env file (if needed)
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
