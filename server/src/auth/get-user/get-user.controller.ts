import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthenticateGuard } from '../authenticate.guard'
import { PayloadType } from '../payload.dto'
import { Request as RequestType } from 'express'
import { GetUserService } from './get-user.service'

@Controller('get-user')
export class GetUserController {
    constructor(private readonly getUserService: GetUserService) {}

    @UseGuards(AuthenticateGuard)
    @Get()
    getUser(@Request() request: RequestType & { user: PayloadType }) {
        return this.getUserService.execute(request.user)
    }
}
