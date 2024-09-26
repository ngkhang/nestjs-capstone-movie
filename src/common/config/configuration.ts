import { registerAs } from '@nestjs/config';
import { AppConfigType } from './config.type';

export const appConfig = registerAs(
  'app',
  (): AppConfigType => ({
    host: process.env.MY_APP_HOST || 'localhost',
    port: parseInt(process.env.MY_APP_PORT, 10) || 3000,
  }),
);

export default [appConfig];
