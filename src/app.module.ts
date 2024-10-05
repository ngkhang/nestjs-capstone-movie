import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CineplexModule } from './cineplex/cineplex.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule, CineplexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
