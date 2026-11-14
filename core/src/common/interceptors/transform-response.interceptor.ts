import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseFormat<T>> {
    const res = context.switchToHttp().getResponse();
    const statusCode = res?.statusCode || 200;

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode,
        timestamp: new Date().toISOString(),
        data,
      }))
    );
  }
}
