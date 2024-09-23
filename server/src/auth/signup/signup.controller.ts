import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignupDto } from './signup.dto'
import { SignupService } from './signup.service'

@Controller('auth/signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    signup(@Body() dto: SignupDto) {
        return this.signupService.execute(dto)
    }
}
