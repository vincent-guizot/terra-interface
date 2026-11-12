import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: any;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseEnvelope<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseEnvelope<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        // If result already formatted with envelope, pass it through
        if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
          return result;
        }

        // Check if result has pagination metadata
        let data = result;
        let meta = undefined;
        let message = 'Operation completed successfully';

        if (result && typeof result === 'object' && 'items' in result && 'meta' in result) {
          data = result.items;
          meta = result.meta;
        } else if (result && typeof result === 'object' && 'message' in result && 'data' in result) {
          message = result.message;
          data = result.data;
          meta = result.meta;
        }

        return {
          success: true,
          statusCode,
          message,
          data,
          meta,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
