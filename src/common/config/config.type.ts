export interface AppConfigType {
  host: string;
  port: number;
}

export interface AuthConfigType {
  jwtSecret: string;
  passportSecret: string;
  jwtExpiresIn: string;
}

export interface AllConfigType {
  app: AppConfigType;
  auth: AuthConfigType;
}
