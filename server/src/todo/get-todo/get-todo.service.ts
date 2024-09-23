import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GetTodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(userId: number) {
        return await this.prismaService.todo.findMany({
            where: {
                userId,
            },
        })
    }
}
