import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { TokenVerifyType } from 'src/shared/types/common.schema';

@Injectable()
/*
  PassportStrategy(Strategy, key)
    - Strategy : đối tượng strategy từ passport-jwt
    - key (default = "jwt") : dựa vào key để liên kết việc chặn token và strategy
*/
export class JwtStrategy extends PassportStrategy(
  Strategy,
  // FIXME: Convert using env variable
  'passport-jwt',
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

  async validate(payload: TokenVerifyType) {
    // Handle validate role (if needed)
    console.log('JWT Strategy Payload:', payload);
    return payload;
  }
}
