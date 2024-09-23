import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SigninDto } from './signin.dto'
import { SigninService } from './signin.service'

@Controller('auth/signin')
export class SigninController {
    constructor(private readonly signinService: SigninService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    sigin(@Body() dto: SigninDto) {
        return this.signinService.execute(dto)
    }
}
