import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This decorator simply return `currentUser` attached to the request.
 */
export const CurrentUser = createParamDecorator(
  /**
   *
   * @param data the parameters provided by the decorator caller. CurrentUserDecorator does not accept any parameter therefore is type never.
   * @param context context wrapper provided by nextjs. It supports http, ws, and gRPC
   * @returns
   */
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    /**
     * `currentUser` is attached to the request bu the current-user interceptor (middleware).
     * we are not able to create it here is because User lookup requests the connection to
     * the service/repository.
     * To make this decorator work, the caller (either controller or module) must inject
     * current-user interceptor
     */
    //
    return request.currentUser;
  },
);
