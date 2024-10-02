import { Response } from 'express';

/**
 * Parameters for creating a ResponseHandler instance.
 */
interface ResponseHandlerParams<T> {
  res: Response;
  message: string;
  data: T;
  status: number;
}

/**
 * Represents the structure of the response data.
 */
class ResTypeDto<C> {
  status: number;
  message: string;
  content: C;
  date: Date;

  constructor(status: number, message: string, content: C) {
    this.status = status;
    this.message = message;
    this.content = content;
    this.date = new Date();
  }
}

/**
 * Handles the creation and sending of custom responses.
 */
class ResponseHandler<T> {
  private res: Response;
  private message: string;
  private data: T;
  private status: number;

  constructor(params: ResponseHandlerParams<T>) {
    this.res = params.res;
    this.message = params.message;
    this.data = params.data;
    this.status = params.status;
  }

  /**
   * Sends the custom response.
   * @returns The Express Response object with the custom response.
   */
  send(): Response<ResTypeDto<T>> {
    const responseBody = new ResTypeDto<T>(
      this.status,
      this.message,
      this.data,
    );

    return this.res.status(this.status).json(responseBody);
  }
}

/**
 * Creates and sends a custom response.
 * @param params The parameters for creating the response.
 * @returns The Express Response object with the custom response.
 */
export const responseCustom = <T>(params: ResponseHandlerParams<T>) =>
  new ResponseHandler(params).send();
