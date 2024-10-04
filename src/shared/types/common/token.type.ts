export interface TokenVerifyType {
  userId: number;
  key: number;
  iat: number;
  exp: number;
}

export interface TokenReturnType {
  token: string;
  refreshToken: string;
}
