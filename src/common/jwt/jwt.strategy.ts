import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/config.service';

@Injectable()
/*
  PassportStrategy(Strategy, key)
    - Strategy : đối tượng strategy từ passport-jwt
    - key (default = "jwt") : dựa vào key để liên kết việc chặn token và strategy
*/
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'passport-secret-movie', // FIXME: Convert using env variable
) {
  constructor(configService: ConfigService) {
    const { jwtSecret } = configService.auth;

    super({
      // Define format JWT from request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    // Handle validate role (if needed)
    return { userId: payload.sub, username: payload.username };
  }
}
