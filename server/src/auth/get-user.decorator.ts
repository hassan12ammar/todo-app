import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { SignupDto } from './signup/signup.dto'

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user as SignupDto

        if (data) return user[data]
        return user
    },
)
