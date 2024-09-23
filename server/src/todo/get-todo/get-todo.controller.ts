import { Get } from '@nestjs/common'
import { TodoController } from '../decorator/todoController.decorator'
import { GetTodoService } from './get-todo.service'
import { GetUser } from 'src/auth/get-user.decorator'

@TodoController()
export class GetTodoController {
    constructor(private readonly getTodoService: GetTodoService) {}

    @Get()
    handle(@GetUser('id') userId: number) {
        return this.getTodoService.execute(userId)
    }
}
