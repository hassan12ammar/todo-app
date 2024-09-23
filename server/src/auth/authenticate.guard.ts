import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { PayloadType } from './payload.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignupDto } from './signup/signup.dto'

@Injectable()
export class AuthenticateGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaServoce: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractToekn(request)
        if (!token) {
            return false
        }

        const payload: PayloadType | false = await this.jwtService
            .verifyAsync<PayloadType>(token)
            .catch(() => false)

        if (!payload) return false

        const user = await this.prismaServoce.user.findUnique({
            where: { id: payload.id },
        })

        request.user = new SignupDto(user)

        return true
    }

    extractToekn(request: Request) {
        const authorization = request.headers.authorization
        return authorization?.split(' ')[1]
    }
}
