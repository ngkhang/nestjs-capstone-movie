import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  MY_APP_NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  MY_APP_PORT: number;

  // Validate Database env
  @IsString()
  DATABASE_URL: string;

  // Validate Passport env
  @IsString()
  AUTH_PASSPORT_SECRET: string;
  // Validate JWT env
  @IsString()
  AUTH_JWT_SECRET: string;
  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
