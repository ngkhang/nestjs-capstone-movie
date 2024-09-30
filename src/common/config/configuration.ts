import { registerAs } from '@nestjs/config';
import { AppConfigType, AuthConfigType } from './config.type';

export const appConfig = registerAs(
  'app',
  (): AppConfigType => ({
    host: process.env.MY_APP_HOST || 'localhost',
    port: parseInt(process.env.MY_APP_PORT, 10) || 3000,
  }),
);

export const jwtConfig = registerAs(
  'auth',
  (): AuthConfigType => ({
    passportSecret: process.env.AUTH_PASSPORT_SECRET || 'jwt',
    jwtSecret: process.env.AUTH_JWT_SECRET || 'jwt-secret',
    jwtExpiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || '1h',
  }),
);

export default [appConfig, jwtConfig];
