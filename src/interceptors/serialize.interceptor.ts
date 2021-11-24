import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer';

// decorator
export function Serilize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// interceptor is just like express middleware with additonal capability of intercept outgoing response
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    // run something before a request is handled by the request handler
    // console.log('im incoming request', context);

    return next.handle().pipe(
      map((data: T) => {
        // run something before the response is sent you
        // console.log('im outgoing data', data);

        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // exclude any DTO property NOT marked as expose
        });
      }),
    );
  }
}
