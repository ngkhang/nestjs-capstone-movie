export interface TokenReturnType {
  token: string;
  refreshToken: string;
}

export interface LoginReturnType {
  data: TokenReturnType;
  message: string;
}

export interface RegisterReturnType {
  data: {
    email: string;
    username: string;
    fullName: string;
    password: string;
  };
  message: string;
}

export interface RefreshReturnType extends LoginReturnType {}
