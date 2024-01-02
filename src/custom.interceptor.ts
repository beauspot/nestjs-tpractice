/* eslint-disable @typescript-eslint/no-unused-vars */
// Creating a custom Interceptor in nestjs'
/* eslint-disable prettier/prettier */

import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('THIS IS INTERCEPTING THE REQUEST');
    console.log({ context });
    return handler.handle().pipe(
      map((data) => {
        /*  console.log('THIS IS INTERCEPTING THE RESPONSE');
        console.log(data);*/
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
