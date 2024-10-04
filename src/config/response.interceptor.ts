import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/shared/types/common/return.type';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((responseData) => {
        const status = context.switchToHttp().getResponse().statusCode;

        let data = responseData;
        let message = 'Successful';

        if (responseData && typeof responseData === 'object') {
          if ('message' in responseData) {
            message = responseData.message;
            delete responseData.message;
          }

          if ('data' in responseData) {
            data = responseData.data;
          }
        }

        return {
          status,
          content: {
            data,
          },
          message,
          date: new Date(),
        };
      }),
    );
  }
}
