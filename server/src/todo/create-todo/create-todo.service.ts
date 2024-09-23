import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './create-todo.dto'
import { TodoOut } from '../todo-out.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CreateTodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(dto: CreateTodoDto, userId: number) {
        const todo = await this.prismaService.todo.create({
            data: {
                ...dto,
                userId,
            },
        })

        return new TodoOut(todo)
    }
}
