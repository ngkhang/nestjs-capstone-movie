import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [ConfigModule, PrismaModule, JwtModule],
  exports: [ConfigModule, PrismaModule, JwtModule],
})
export class CommonModule {}
