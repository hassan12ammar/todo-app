import { Body, Param, ParseIntPipe, Patch } from '@nestjs/common'
import { TodoController } from '../decorator/todoController.decorator'
import { UpdateTodoDto } from './update-todo.dto'
import { UpdateTodoService } from './update-todo.service'

@TodoController()
export class UpdateTodoController {
    constructor(private readonly updateTodoService: UpdateTodoService) {}

    @Patch('/:id')
    handle(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto) {
        return this.updateTodoService.execute(id, dto)
    }
}
