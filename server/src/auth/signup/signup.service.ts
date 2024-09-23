import { BadRequestException, Injectable } from '@nestjs/common'
import { SignupDto } from './signup.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PayloadType } from '../payload.dto'
import { Prisma } from '@prisma/client'
import { AuthOut } from '../authOut.dto'
import { generateAuthOut } from '../generateAuthOut'

@Injectable()
export class SignupService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async execute(dto: SignupDto): Promise<AuthOut> {
        const saltOrRound = await bcrypt.genSalt()

        dto.password = await bcrypt.hash(dto.password, saltOrRound)
        const user = await this.prismaService.user
            .create({
                data: {
                    ...dto,
                },
            })
            .catch((error) => {
                if (this.usernameUsed(error))
                    throw new BadRequestException('Username is already used')

                throw error
            })

        return await generateAuthOut(user, this.jwtService)
    }

    private usernameUsed(error: any) {
        return (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        )
    }
}
