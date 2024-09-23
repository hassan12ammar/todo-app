import updateTodoApi from "../api/updateTodoApi"
import { useMutation, useQueryClient } from "react-query"
import { TodoType } from "../todo"
import deleteTodoApi from "../api/deleteTodoApi"
import { debounce } from "lodash"
import { useCallback, useState } from "react"

export interface ITodoItemProps {
    title: string
    description: string
    completed: boolean
    id: number
}

export default function TodoItem(todo: ITodoItemProps) {
    const queryClient = useQueryClient()
    const [edit, setEdit] = useState(false)

    const { mutate: updateTodo } = useMutation(
        (updatedTodo: TodoType) => updateTodoApi(updatedTodo),
        {
            onSettled: () => {
                queryClient.invalidateQueries("todos")
            },
        }
    )

    const debouncedUpdateTodo = useCallback(debounce(updateTodo, 1000), [
        updateTodo,
    ])

    const { mutate: deleteTodo } = useMutation(
        (id: number) => deleteTodoApi(id),
        {
            onSettled: () => {
                queryClient.invalidateQueries("todos")
            },
        }
    )

    return (
        <div className="todo-item">
            <div>
                Completed:
                <input
                    checked={todo.completed}
                    type="checkbox"
                    onChange={() =>
                        updateTodo({
                            ...todo,
                            completed: !todo.completed,
                        })
                    }
                />
            </div>

            {textContent()}

            <div className="buttons">
                <button onClick={() => setEdit(!edit)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </div>
            <br />
        </div>
    )

    function textContent() {
        if (edit) {
            return (
                <>
                    <input
                        type="text"
                        defaultValue={todo.title}
                        onChange={(e) => {
                            debouncedUpdateTodo({
                                ...todo,
                                title: e.target.value,
                            })
                        }}
                    />

                    <br />

                    <textarea
                        defaultValue={todo.description}
                        onChange={(e) => {
                            debouncedUpdateTodo({
                                ...todo,
                                description: e.target.value,
                            })
                        }}
                    ></textarea>
                </>
            )
        } else {
            return (
                <div>
                    <p>{todo.title}</p>
                    <p>{todo.description}</p>
                </div>
            )
        }
    }
}
