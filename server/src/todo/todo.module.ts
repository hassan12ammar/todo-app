import { Module } from '@nestjs/common'
import { CreateTodoController } from './create-todo/create-todo.controller'
import { CreateTodoService } from './create-todo/create-todo.service'
import { DeleteTodoController } from './delete-todo/delete-todo.controller'
import { DeleteTodoService } from './delete-todo/delete-todo.service'
import { GetTodoController } from './get-todo/get-todo.controller'
import { GetTodoService } from './get-todo/get-todo.service'
import { UpdateTodoController } from './update-todo/update-todo.controller'
import { UpdateTodoService } from './update-todo/update-todo.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
    controllers: [
        CreateTodoController,
        GetTodoController,
        UpdateTodoController,
        DeleteTodoController,
    ],
    providers: [
        PrismaService,
        CreateTodoService,
        GetTodoService,
        UpdateTodoService,
        DeleteTodoService,
    ],
})
export class TodoModule {}
