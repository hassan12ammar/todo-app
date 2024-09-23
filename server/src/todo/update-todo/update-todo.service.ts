import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateTodoDto } from './update-todo.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { TodoOut } from '../todo-out.dto'
import { error } from 'console'
import { Prisma } from '@prisma/client'

@Injectable()
export class UpdateTodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(id: number, dto: UpdateTodoDto) {
        const todo = await this.prismaService.todo
            .update({
                where: {
                    id,
                },
                data: { ...dto },
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

        return new TodoOut(todo)
    }
}
