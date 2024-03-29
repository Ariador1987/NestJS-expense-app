import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, handler: CallHandler) {
        console.log('THIS IS INTERCEPTING THE REQUEST');
        console.log(ctx, ' context');
        return handler.handle().pipe(
            map((data) => {
                console.log('THIS IS INTERCEPTING THE RESPONSE');
                console.log(data, ' data');
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
