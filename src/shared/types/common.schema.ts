export interface TokenVerifyType {
  userId: number;
  key: number;
  iat: number;
  exp: number;
}

export class ReturnType<T> {
  data: T;
  message?: string | 'Success';
}
