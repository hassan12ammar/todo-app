import { BadRequestException, Injectable } from '@nestjs/common'
import { SigninDto } from './signin.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { AuthOut } from '../authOut.dto'
import { JwtService } from '@nestjs/jwt'
import { generateAuthOut } from '../generateAuthOut'

@Injectable()
export class SigninService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async execute(dto: SigninDto): Promise<AuthOut> {
        const user = await this.prismaService.user
            .findUniqueOrThrow({
                where: {
                    username: dto.username,
                },
            })
            .catch((error) => {
                if (this.userNotFound(error))
                    throw new BadRequestException('Wrong Credentials')

                throw error
            })

        const passwordMatch = await bcrypt.compare(dto.password, user.password)
        if (!passwordMatch) {
            throw new BadRequestException('')
        }

        return await generateAuthOut(user, this.jwtService)
    }

    private userNotFound(error: any) {
        return (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
        )
    }
}
