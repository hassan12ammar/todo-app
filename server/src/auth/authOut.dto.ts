import { SignupDto } from './signup/signup.dto'

export class AuthOut {
    user: SignupDto
    token: string

    constructor(partial: AuthOut) {
        Object.assign(this, partial)
    }
}
