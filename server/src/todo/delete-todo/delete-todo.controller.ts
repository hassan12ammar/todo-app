import { Delete, Param, ParseIntPipe } from '@nestjs/common'
import { TodoController } from '../decorator/todoController.decorator'
import { DeleteTodoService } from './delete-todo.service'

@TodoController()
export class DeleteTodoController {
    constructor(private readonly deleteTodoService: DeleteTodoService) {}

    @Delete('/:id')
    handle(@Param('id', ParseIntPipe) id: number) {
        return this.deleteTodoService.execute(id)
    }
}
