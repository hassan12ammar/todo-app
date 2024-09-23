import { applyDecorators, Controller, UseGuards } from '@nestjs/common'
import { AuthenticateGuard } from 'src/auth/authenticate.guard'

export function TodoController(prefix = '') {
    return applyDecorators(
        Controller('todo/' + prefix),
        UseGuards(AuthenticateGuard),
    )
}
