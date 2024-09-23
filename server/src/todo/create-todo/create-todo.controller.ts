import { TodoController } from '../decorator/todoController.decorator'
import { Body, Post } from '@nestjs/common'
import { CreateTodoDto } from './create-todo.dto'
import { CreateTodoService } from './create-todo.service'
import { GetUser } from 'src/auth/get-user.decorator'

@TodoController()
export class CreateTodoController {
    constructor(private readonly createTodoService: CreateTodoService) {}

    @Post()
    handle(@Body() dto: CreateTodoDto, @GetUser('id') userId: number) {
        return this.createTodoService.execute(dto, userId)
    }
}
