import { AllConfigType } from './config.type';

// Initial
const DEFAULT_APP_PORT = 3000;

export default (): AllConfigType => ({
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: parseInt(process.env.APP_PORT, 10) || DEFAULT_APP_PORT,
  },
});
