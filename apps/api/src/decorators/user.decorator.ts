import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { JWTPayload } from '@dashboard/dtos'

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user as JWTPayload
  },
)
