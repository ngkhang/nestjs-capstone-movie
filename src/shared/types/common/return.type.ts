export interface ApiResponse<T> {
  status: number;
  content: {
    data: T;
  };
  message: string;
  date: Date;
}

export type ResponseType<T> =
  | {
      data: T;
      message?: string;
    }
  | T;
