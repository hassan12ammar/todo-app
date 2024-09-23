import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DeleteTodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(id: number) {
        await this.prismaService.todo
            .delete({
                where: {
                    id,
                },
            })
            .catch((error) => {
                if (
                    error instanceof Prisma.PrismaClientKnownRequestError &&
                    error.code === 'P2025'
                ) {
                    throw new BadRequestException('ToDo not Found')
                }

                throw error
            })

        return 'Deleted Successfully'
    }
}
