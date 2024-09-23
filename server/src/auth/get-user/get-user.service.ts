import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PayloadType } from '../payload.dto'
import { SignupDto } from '../signup/signup.dto'

@Injectable()
export class GetUserService {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(payload: PayloadType) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.id,
            },
        })

        return new SignupDto(user)
    }
}
