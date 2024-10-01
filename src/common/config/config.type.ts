export interface AppConfigType {
  host: string;
  port: number;
}

export interface AuthConfigType {
  passportSecret: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
}

export interface AllConfigType {
  app: AppConfigType;
  auth: AuthConfigType;
}
