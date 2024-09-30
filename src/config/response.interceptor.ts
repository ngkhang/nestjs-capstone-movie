import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResTypeDto<C> {
  content: C;
  status?: number;
  message?: string;
  date?: Date;

  constructor(status: number, content: C, message?: string, date?: Date) {
    this.status = status;
    this.content = content;
    this.message = message;
    this.date = date || new Date();
  }
}

@Injectable()
export class CustomResponseInterceptor<T extends Record<string, any>>
  implements NestInterceptor<T, ResTypeDto<T | { data: T }>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResTypeDto<T | { data: T }>> {
    return next.handle().pipe(
      map((rawData: T) => {
        // If the response already follows the ResTypeDto structure, return it directly.
        if (rawData instanceof ResTypeDto) {
          return rawData;
        }
        const status = context.switchToHttp().getResponse().statusCode;
        const message = rawData.message || 'Success';
        const content = 'data' in rawData ? rawData : { data: rawData };

        // FIXME: Delete properties not use loop
        if (content && typeof content === 'object') {
          ['date', 'message'].forEach((e) => {
            if (e in content) delete content[e];
          });
        }
        return new ResTypeDto(status, content, message, new Date());
      }),
    );
  }
}
