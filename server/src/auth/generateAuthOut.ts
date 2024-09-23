import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import { SignupDto } from './signup/signup.dto'
import { AuthOut } from './authOut.dto'
import { PayloadType } from './payload.dto'

export async function generateAuthOut(
    user: Prisma.UserGetPayload<{}>,
    jwtService: JwtService,
) {
    const payload: PayloadType = { id: user.id, username: user.lastname }
    const token = await jwtService.signAsync(payload)

    return new AuthOut({
        token: token,
        user: new SignupDto(user),
    })
}
